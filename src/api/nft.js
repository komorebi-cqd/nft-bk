import request from '@/utils/request'

//查询最近的动态
export function queryRecentNft(params) {
    return request({
        url: '/nft/publishNft',
        method: 'get',
        params
    })
}

//发布NFT
export function releaseNft(data) {
    return request({
        url: '/nft/queryRecentNft',
        method: 'post',
        data
    })
}