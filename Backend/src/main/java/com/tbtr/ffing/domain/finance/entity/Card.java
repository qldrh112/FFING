package com.tbtr.ffing.domain.finance.entity;

import com.tbtr.ffing.domain.user.entity.SsafyUser;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
@Table(name = "card")
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cardId;

    @Column(nullable = false, length = 4)
    private String cardIssuerCode;

    @Column(nullable = false, length = 100)
    private String cardName;

    @Column(nullable = false, length = 16)
    private String cardNo;

    @Column(nullable = false, length = 3)
    private String cvc;

    @Column(nullable = false)
    private LocalDate cardExpiryDate;

    @Column(nullable = false, length = 16)
    private String withdrawalAccountNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_product_id", nullable = false)
    private CardProduct cardProduct;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ssafy_user_id", nullable = false)
    private SsafyUser ssafyUser;


}