package com.main026.walking.util.embedded;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Embeddable;

@Getter
@Setter
@Embeddable
@NoArgsConstructor
public class Address {
    private String si;
    private String gu;
    private String dong;

    public Address(String si, String gu, String dong) {
        this.si = si;
        this.gu = gu;
        this.dong = dong;
    }
}
