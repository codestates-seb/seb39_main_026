package com.main026.walking.community.repository;

import com.main026.walking.community.dto.CommunitySearchCond;
import com.main026.walking.community.entity.Community;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Visitor;
import com.querydsl.core.types.dsl.*;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.util.StringUtils;

import javax.persistence.EntityManager;
import java.util.List;

import static com.main026.walking.community.entity.QCommunity.community;

public class CommunityRepositoryImpl implements CommunityRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    public CommunityRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Page<Community> findAllWithCond(CommunitySearchCond searchCond, Pageable pageable) {
        List<Community> content = searchCommunity(searchCond,pageable);
        JPAQuery<Long> countQuery = getCountQuery(searchCond);

        return PageableExecutionUtils.getPage(content,pageable,countQuery::fetchOne);
    }

    private JPAQuery<Long> getCountQuery(CommunitySearchCond searchCond){
        return queryFactory
                .select(community.count())
                .from(community)
                .where(searchText(searchCond.getName()));
    }


    private List<Community> searchCommunity(CommunitySearchCond searchCond, Pageable pageable) {
        return queryFactory
                .select(community)
                .from(community)
                .where(searchText(searchCond.getName()),
                        searchSi(searchCond.getSi()),
                        searchGu(searchCond.getGu()),
                        searchDong(searchCond.getDong()),
                        isExpired(searchCond.getCond()))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(boardSort(pageable))
                .fetch();
    }

    private BooleanExpression searchSi(String si){
        if(StringUtils.hasText(si)){
            return community.address.si.like("%"+si+"%");
        }
        return null;
    }

    private BooleanExpression searchGu(String gu){
        if(StringUtils.hasText(gu)){
            return community.address.gu.like("%"+gu+"%");
        }
        return null;
    }

    private BooleanExpression searchDong(String dong){
        if(StringUtils.hasText(dong)){
            return community.address.dong.like("%"+dong+"%");
        }
        return null;
    }

    private BooleanExpression searchText(String name){
        if(StringUtils.hasText(name)){
            return community.name.like("%"+name+"%");
        }
        return null;
    }

    private BooleanExpression isExpired(String cond){
        if(StringUtils.hasText(cond)){
            return community.capacity.ne(community.communityPets.size());
        }
        return null;
    }

    private OrderSpecifier<?> boardSort(Pageable page) {
        //??????????????? ????????? Pageable ????????? ???????????? null ??? ??????
        NumberExpression<Integer> hot = community.communityPets.size();
        NumberExpression<Integer> capacity = community.capacity.castToNum(Integer.class);
        NumberExpression<Integer> subtract = capacity.subtract(hot);

        if (!page.getSort().isEmpty()) {
            //???????????? ?????? ????????? for ???????????? ?????? ????????????
            for (Sort.Order order : page.getSort()) {
                // ??????????????? ????????? DESC or ASC ??? ????????????.
                Order direction = order.getDirection().isAscending() ? Order.ASC : Order.DESC;
                // ??????????????? ????????? ?????? ????????? ????????? ????????? ?????? ???????????? ???????????? ??????.
                switch (order.getProperty()) {
                    //?????????
                    case "new":
                        return new OrderSpecifier(direction, community.id);
                    case "hot":
                        return new OrderSpecifier(direction, subtract);
                }
            }
        }
        return new OrderSpecifier(Order.DESC, community.id);
    }
}
