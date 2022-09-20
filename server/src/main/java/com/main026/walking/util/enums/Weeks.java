package com.main026.walking.util.enums;

public enum Weeks {
    MON("월요일"),TUE("화요일"),WED("수요일"),THU("목요일"),FRI("금요일"),SAT("토요일"),SUN("일요일");

    private final String korean;

    Weeks(String korean) {
        this.korean = korean;
    }

    public String getKorean(){
        return korean;
    }
}
