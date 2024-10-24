package com.tbtr.ffing.domain.finance.controller;

import com.tbtr.ffing.domain.finance.dto.response.asset.AccountAssetRes;
import com.tbtr.ffing.domain.finance.dto.response.asset.AccountTransactionAssetRes;
import com.tbtr.ffing.domain.finance.service.AssetService;
import com.tbtr.ffing.domain.user.dto.CustomUserDetails;
import com.tbtr.ffing.global.common.dto.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/asset")
@RequiredArgsConstructor
public class AssetController {

    private final AssetService assetService;

    @GetMapping("")
    public ResponseEntity<Object> selectAssetHomeInfo(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Map<String, Object> assetInfoMap = assetService.getAssetHomeInfo(userDetails.getUserId());

        Response<Object> response = Response.builder()
                .code(200L)
                .message("성공")
                .result(assetInfoMap)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/deposit")
    public ResponseEntity<Object> selectDepositAsset(@AuthenticationPrincipal CustomUserDetails userDetails) {
        List<Object> deposits = assetService.getDepositList(userDetails.getUserId());

        Response<Object> response = Response.builder()
                .code(200L)
                .message("성공")
                .result(deposits)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/deposit/{type}/{accountId}")
    public ResponseEntity<Object> selectDepositTransactionList(@PathVariable String type, @PathVariable long accountId) {
        List<?> transactions = assetService.getDepositTransactionList(type, accountId);

        Response<Object> response = Response.builder()
                .code(200L)
                .message("성공")
                .result(transactions)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/account")
    public ResponseEntity<Object> selectAccountAsset(@AuthenticationPrincipal CustomUserDetails userDetails) {
        List<AccountAssetRes> accounts = assetService.getAccountList(userDetails.getUserId());

        Response<Object> response = Response.builder()
                .code(200L)
                .message("성공")
                .result(accounts)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/account/{accountId}")
    public ResponseEntity<Object> selectAccountTransactionList(@PathVariable long accountId) {
        List<AccountTransactionAssetRes> transactions = assetService.getAccountTransactionList(accountId);

        Response<Object> response = Response.builder()
                .code(200L)
                .message("성공")
                .result(transactions)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
