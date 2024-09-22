import MintyToken from 0xf8d6e0586b0a20c7

// This transaction calls the "hello" method on the HelloAsset object
// that is stored in the account's storage by removing that object
// from storage, calling the method, and then saving it back to the same storage path

access(all) fun main(address: Address): String {
    let account = getAuthAccount<auth(Storage) &Account>(address)
    account.storage.load<@MintyToken.MintyTokenResource>(from: /storage/HelloAssetTutorial)

    /// In this prepare block, we have to load a value from storage
    /// in addition to saving it, so we also need the `LoadValue` entitlement
    /// which additionally allows loading values from storage 
    prepare(acct: auth(LoadValue, SaveValue) &Account) {

        // Load the resource from storage, specifying the type to load it as
        // and the path where it is stored
        let helloResource <- acct.storage.load<@MintyToken.MintyTokenResource>(from: /storage/HelloAssetTutorial)
            ?? panic("The signer does not have the HelloAsset resource stored at /storage/HelloAssetTutorial. Run the `Create Hello` Transaction again to store the resource")

        // log the hello world message
        log(helloResource.hello())

        // Put the resource back in storage at the same spot
        acct.storage.save(<-helloResource, to: /storage/HelloAssetTutorial)
    }
}