pragma solidity ^0.8.0;

contract EthReceiver {
    event PurchaseReceived(address indexed buyer, uint256 amount, string partner);

    function purchase(string memory partner) public payable {
        emit PurchaseReceived(msg.sender, msg.value, partner);
    }

    function withdraw(address payable _to, uint256 _amount) public {
        require(address(this).balance >= _amount, "Insufficient balance");
        _to.transfer(_amount);
    }
}