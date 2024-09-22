import MintyToken from "./MintyToken.cdc"
access(all) contract MintyPlatform {
    access(all) let partnerAddress: Address
    access(all) let partnerRewardPercentage: UFix64
    access(all) let consumerAddress: Address
    
    access(all) fun handlePurchase(purchaseAmount: UFix64) {
        let rewardAmount = purchaseAmount * self.partnerRewardPercentage
        
    }
    
    init() {
        self.partnerAddress = 0x02
        self.partnerRewardPercentage = 0.1
        self.consumerAddress = 0x06
    }
}