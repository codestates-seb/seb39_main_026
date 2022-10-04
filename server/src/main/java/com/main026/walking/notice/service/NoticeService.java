package com.main026.walking.notice.service;

import com.main026.walking.auth.principal.PrincipalDetails;
import com.main026.walking.community.entity.Community;
import com.main026.walking.community.repository.CommunityRepository;
import com.main026.walking.exception.BusinessLogicException;
import com.main026.walking.exception.ExceptionCode;
import com.main026.walking.member.entity.Member;
import com.main026.walking.notice.dto.NoticeDto;
import com.main026.walking.notice.entity.Notice;
import com.main026.walking.notice.mapper.NoticeMapper;
import com.main026.walking.notice.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class NoticeService {
    private final NoticeMapper noticeMapper;
    private final NoticeRepository noticeRepository;
    private final CommunityRepository communityRepository;

    //  Create
    public NoticeDto.Response createNotice(NoticeDto.Post dto, Long communityId, PrincipalDetails principalDetails) {

        Notice entity = noticeMapper.postDtoToEntity(dto);

        Community findCommunity = communityRepository.findById(communityId).orElseThrow();

        log.info("모임 Id "+findCommunity.getId()+" 에서 공지 등록 요청");

        Member representMember = findCommunity.getRepresentMember();
        Member member = principalDetails.getMember();
        if (representMember.getId()!=member.getId()){
            throw new BusinessLogicException(ExceptionCode.NO_AUTHORIZATION);
        }

        entity.setCommunity(findCommunity);

        Notice notice = noticeRepository.save(entity);
        return noticeMapper.entityToDtoResponse(notice);
    }

    //  Read
    public NoticeDto.Response findNotice(long noticeId) {
        Notice verifiedNotice = findVerifiedNotice(noticeId);
        return noticeMapper.entityToDtoResponse(verifiedNotice);
    }


    //  Update
    public NoticeDto.Response updateNotice(long noticeId, NoticeDto.Patch dto,PrincipalDetails principalDetails) {
        isOwner(noticeId,principalDetails);
        log.info("공지 수정 요청");
        Notice target = findVerifiedNotice(noticeId);
        noticeMapper.updateEntityFromDto(dto, target);
        Notice notice = noticeRepository.save(target);
        return noticeMapper.entityToDtoResponse(notice);
    }

    //  Delete
    public void deleteNotice(long noticeId,PrincipalDetails principalDetails) {
        log.info("공지 삭제 요청");
        isOwner(noticeId,principalDetails);
        Notice target = findVerifiedNotice(noticeId);
        noticeRepository.delete(target);
    }

    //  Valid
    private Notice findVerifiedNotice(long noticeId) {
        Optional<Notice> optionalEntity =
                noticeRepository.findById(noticeId);
        Notice findNotice =
                optionalEntity.orElseThrow(() -> new RuntimeException("NOTICE_NOT_FOUND"));

        return findNotice;
    }

    private void isOwner(Long noticeId,PrincipalDetails principalDetails){
        Notice notice = noticeRepository.findById(noticeId).orElseThrow();
        Member representMember = notice.getCommunity().getRepresentMember();
        Member principalDetailsMember = principalDetails.getMember();
        if(representMember.getId()!= principalDetailsMember.getId()){
            throw new BusinessLogicException(ExceptionCode.NO_AUTHORIZATION);
        }
    }
}
