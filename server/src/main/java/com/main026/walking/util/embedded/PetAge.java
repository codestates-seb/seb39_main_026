package com.main026.walking.util.embedded;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Embeddable;

@Getter
@Setter
@Embeddable
@NoArgsConstructor
public class PetAge {
    private Integer years;
    private Integer months;
    private String birthDay;

    public PetAge(Integer years, Integer months,String birthDay) {
        this.years = years;
        this.months = months;
        this.birthDay = birthDay;
    }
}
