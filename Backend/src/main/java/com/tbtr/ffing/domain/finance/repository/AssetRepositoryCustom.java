package com.tbtr.ffing.domain.finance.repository;

import com.tbtr.ffing.domain.finance.dto.response.asset.*;

import java.util.List;

public interface AssetRepositoryCustom {
    AssetRes findCurrentAssetByUserId(long userId);

    AssetRes findRecentAssetByUserId(Long userId);

    List<AssetRes> findAssetHistoryByUserId(long userId);

    List<DepositAssetRes> findDepositAssetListByUserId(long ssafyUserId);

    List<SavingsAssetRes> findSavingsAssetListByUserId(long ssafyUserId);

    List<AccountAssetRes> findAccountAssetListByUserId(long ssafyUserId);

    List<DepositTransactionAssetRes> findDepositTransactionByDepositAccountId(long accountId);

    List<SavingsTransactionAssetRes> findSavingsTransactionBySavingsAccountId(long accountId);

    List<AccountTransactionAssetRes> findAccountTransactionByAccountId(long accountId);
}
