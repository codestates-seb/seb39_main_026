package com.main026.walking.util.datainit;

import com.main026.walking.comment.entity.Comment;
import com.main026.walking.comment.repository.CommentRepository;
import com.main026.walking.community.entity.Community;
import com.main026.walking.community.repository.CommunityRepository;
import com.main026.walking.image.entity.Image;
import com.main026.walking.image.repository.ImageRepository;
import com.main026.walking.member.entity.Member;
import com.main026.walking.member.repository.MemberRepository;
import com.main026.walking.notice.entity.Notice;
import com.main026.walking.notice.repository.NoticeRepository;
import com.main026.walking.pet.entity.CommunityPet;
import com.main026.walking.pet.entity.Pet;
import com.main026.walking.pet.repository.CommunityPetRepository;
import com.main026.walking.pet.repository.PetRepository;
import com.main026.walking.util.embedded.Address;

import com.main026.walking.util.embedded.PetAge;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.Arrays;

@Slf4j
@RequiredArgsConstructor
public class InitData {

    private final MemberRepository memberRepository;
    private final PetRepository petRepository;
    private final CommunityRepository communityRepository;
    private final CommunityPetRepository communityPetRepository;
    private final NoticeRepository noticeRepository;
    private final CommentRepository commentRepository;
    private final ImageRepository imageRepository;

    private final BCryptPasswordEncoder encoder;

    @EventListener(ApplicationReadyEvent.class)
    public void init(){
        Address address = new Address("뉴욕시","맨하튼구","동도동");

        log.info("멤버 추가");
        //TODO 테스트용 김코딩 토큰
        Member kimcoding = Member.builder()
                .email("kimcoding@codestates.com")
                .address(address)
                .username("김코딩")
                .password(encoder.encode("12345678"))
                .imgUrl("MEMBER_SAMPLE_01.jpg")
                .build();
        kimcoding.setRoles();
        memberRepository.save(kimcoding);

        Member parkhacker = Member.builder()
                .email("parkhacker@codestates.com")
                .address(address)
                .username("박해커")
                .password(encoder.encode("12345678"))
                .imgUrl("MEMBER_SAMPLE_02.jpg")
                .build();
        kimcoding.setRoles();
        memberRepository.save(parkhacker);

        Member steven = Member.builder()
                .email("steven@codestates.com")
                .address(address)
                .username("제갈스티븐")
                .password(encoder.encode("12345678"))
                .imgUrl("MEMBER_SAMPLE_03.jpg")
                .build();
        kimcoding.setRoles();
        memberRepository.save(steven);

        log.info("김코딩 강아지 등록");
        Pet cat = Pet.builder()
                .petName("고양이")
                .member(kimcoding)
                .about("하는 짓이 고양이같아서 고양이입니다")
                .imgUrl("PET_SAMPLE_01.jpg")
                .neuter("O")
                .breed("세퍼트")
                .petAges(new PetAge(3,8,""))
                .petGender("여")
                .personality("발랄함")
                .build();
        petRepository.save(cat);

        Pet kokiri = Pet.builder()
                .petName("코끼리")
                .member(kimcoding)
                .about("저는 과자를 주면 코로 받아서 코끼리에요")
                .imgUrl("PET_SAMPLE_02.jpg")
                .neuter("O")
                .breed("믹스견")
                .petAges(new PetAge(2,4,""))
                .petGender("남")
                .personality("똑똑함")
                .build();
        petRepository.save(kokiri);

        Pet apple = Pet.builder()
                .petName("애플이")
                .member(kimcoding)
                .about("주인님이 애플을 너무 좋아해서 애플이되었어요 삼성이 아니라 다행이에요")
                .imgUrl("PET_SAMPLE_03.jpg")
                .neuter("X")
                .breed("푸들")
                .petAges(new PetAge(0,3,""))
                .petGender("남")
                .personality("침착함")
                .build();
        petRepository.save(apple);

        Pet chunSam = Pet.builder()
                .petName("춘삼")
                .member(steven)
                .about("Hello! My name is ChunSam. Nice to meet you!")
                .imgUrl("PET_SAMPLE_04.jpg")
                .neuter("X")
                .breed("삽살개")
                .petAges(new PetAge(7,7,""))
                .petGender("남")
                .personality("활발함")
                .build();
        petRepository.save(chunSam);


        log.info("모임 생성");
        Community sosim = Community.builder()
                .name("소심이들 모여라~! 소심견들을 위한 사회성기르기")
                .address(new Address("서울특별시", "서대문구", "어떤동"))
                .place("짱짱공원")
                .body("강아지 한마리만 키워서 사회성을 길러야겠다 생각하시나요? 유달리 우리 강아지가 소극적인것같나요? 친구를 만들어주세요! 강아지의 활발한 모습을 발견하세요!")
                .dates(Arrays.asList("SAT","SUN"))
                .time("13:00:00")
                .capacity(10)
                .viewed(47L)
                .liked(10L)
                .representMember(kimcoding)
                .build();
        communityRepository.save(sosim);
        Image sosimImg = Image.builder().storeFilename("COMMUNITY_SAMPLE_01.jpg").community(sosim).build();
        imageRepository.save(sosimImg);


        Community healthy = Community.builder()
                .name("그냥 산책은 잊어라, 뛰고 구르는 훈련형 산책!!")
                .address(new Address("부산광역시", "해운대구", "우동"))
                .place("예비군훈련장")
                .body("꼭 강아지만 산책을 해야하나요? 당신도 참여하십시오! 강아지와 전우애를 기르는 본격 국방력강화 교육")
                //.dates(new ArrayList<>())
                .date("2022-10-18")
                .time("09:00:00")
                .capacity(30)
                .viewed(5L)
                .liked(0L)
                .representMember(steven)
                .build();
        communityRepository.save(healthy);
        Image healthyImg = Image.builder().storeFilename("COMMUNITY_SAMPLE_02.jpg").community(healthy).build();
        imageRepository.save(healthyImg);

        Community walkwalk = Community.builder()
                .name("오늘은~ 우리~ 같이~ 걸어요~ 여럿이서~~")
                .address(new Address("광주광역시", "광산구", "서봉동"))
                .place("굿굿테마파크")
                .body("굿굿 테마파크에서 100주년을 맞이하여 여러분을 초대합니다!")
                //.dates(new ArrayList<>())
                .date("2022-12-24")
                .time("17:00:00")
                .capacity(30)
                .viewed(53L)
                .liked(10L)
                .representMember(parkhacker)
                .build();
        communityRepository.save(walkwalk);
        Image walkImg = Image.builder().storeFilename("COMMUNITY_SAMPLE_03.jpg").community(walkwalk).build();
        imageRepository.save(walkImg);

        log.info("모임 가입");
        CommunityPet sosimCat = CommunityPet.builder().community(sosim).pet(cat).build();
        communityPetRepository.save(sosimCat);
        CommunityPet sosimCS = CommunityPet.builder().community(sosim).pet(chunSam).build();
        communityPetRepository.save(sosimCS);
        CommunityPet sosimKokiri = CommunityPet.builder().community(sosim).pet(kokiri).build();
        communityPetRepository.save(sosimKokiri);

        CommunityPet walkCS = CommunityPet.builder().community(walkwalk).pet(chunSam).build();
        communityPetRepository.save(walkCS);
        CommunityPet walkApple = CommunityPet.builder().community(walkwalk).pet(apple).build();
        communityPetRepository.save(walkApple);

        log.info("공지 추가");
        Notice sosimNotice = Notice.builder()
                .title("입마개 착용 필수입니다!")
                .body("우리개는 안물어요~ 그런거 없습니다! 소형견도 입마개는 반드시 준비해주세요")
                .community(sosim)
                .build();
        noticeRepository.save(sosimNotice);
        Notice healthyNotice = Notice.builder()
                .title("저희 산책모임에 대한 음해를 멈춰주십시오")
                .body("요즘 저희 모임이 산책모임을 가장한 국방부 장병육성프로그램이라는 오해를 받고있습니다.\n" +
                        "이는 완전히 오해이며 저희는 정말 강아지를 사랑하는 사람이라는 것을 밝힙니다.")
                .community(healthy)
                .build();
        noticeRepository.save(healthyNotice);

        log.info("댓글 추가");
        Comment sosimComment1 = Comment.builder()
                .body("친구없던 저희 강아지가 너무 밝아졌어요! 여기 꼭 추천드립니다")
                .member(steven)
                .community(sosim)
                .build();
        commentRepository.save(sosimComment1);
        Comment sosimComment2 = Comment.builder()
                .body("저희 강아지가 소심하진않은데 사회성이 없어요.. 참여 괜찮을까요?")
                .member(parkhacker)
                .community(sosim)
                .build();
        commentRepository.save(sosimComment2);
        Comment healthyComment1 = Comment.builder()
                .body("여러분 여기가지마십시오 강아지가 힘든게 아니라 주인이 힘듭니다. 아니, 우리가 통나무를 왜드냐고")
                .member(kimcoding)
                .community(healthy)
                .build();
        commentRepository.save(healthyComment1);
        Comment walkComment1 = Comment.builder()
                .body("저 작년에 여기 가서 정말 좋았어요^^ 직원분들도 착하고 가격도 합리적이라 추천드립니다(여기 앞까지 복사해주세요)")
                .member(steven)
                .community(walkwalk)
                .build();
        commentRepository.save(walkComment1);


    }
}
