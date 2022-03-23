import request from '@/utils/request'

//查询最近的动态 管理员  动态NFT下面的机构NFT列表
export function queryRecentNft(params) {
    return request({
        url: '/nft/queryRecentNft',
        method: 'get',
        params
    })
}

//查询最近的动态 用户  发布下面的机构NFT列表
export function queryNftByUnionId(params) {
    return request({
        url: '/nft/queryNftByUnionId',
        method: 'get',
        params
    })
}

//发布NFT
export function releaseNft(data) {
    return request({
        url: '/nft/publishNft',
        method: 'post',
        data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

//删除NFT  管理员使用 参数：unionId  nftRecording
export function deleteNft(data) {
    return request({
        url: '/nft/deleteNftRecording',
        method: 'post',
        data
    })
}

//删除NFT  机构使用 参数 ：nftRecording
export function deleteNftByUnionId(data) {
    return request({
        url: '/nft/deleteNftByUnionId',
        method: 'post',
        data
    })
}

//修改NFT状态  参数： nftRecording   nftStatus
export function modifyStateAgency(data) {
    return request({
        url: '/nft/updateNftStateByUnionId',
        method: 'post',
        data
    })
}


