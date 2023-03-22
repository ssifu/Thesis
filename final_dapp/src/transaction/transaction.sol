// SPDX-License-Identifier: Unlicensed

pragma solidity >=0.7.0;

contract transaction{

    address private owner;
    constructor(){
        owner=msg.sender;
    }

    modifier onlyOwner() {
    require(msg.sender == owner, "Only the owner can perform this action");
    _;
   }

    struct Establishment{
        string category;
        string privacy;
        bool authorized;
    }

    mapping(address => Establishment) public establishment;


    function authorize(address person, string memory _category, string memory _privacy) public onlyOwner {
        require(establishment[person].authorized==false,"Already Authorized");
        establishment[person].authorized = true;
        establishment[person].category = _category;
        establishment[person].privacy = _privacy;
    }



    function unauthorize(address person) public onlyOwner{
        require(establishment[person].authorized==true,"Already Unauthorized");
        delete(establishment[person]);
    }


    
    function getUser(address _address) external view returns (Establishment memory, bool) {
        Establishment memory est = establishment[_address];
        if (est.authorized == true) {
            return (est, true);
        } else {
            return (Establishment({category: "", privacy: "", authorized:false}), false);
        }
    }


    event transactions(address indexed from, address to, uint amount, string symbol, uint date);

    event recipeints(address indexed reecipientOf, address recipient, string recipientName);

    function _transfer(address payable _to, string memory symbol) public payable {
        _to.transfer(msg.value);
        emit transactions(msg.sender, _to, msg.value, symbol, block.timestamp);
    }
    function saveTx(address from, address to, uint amount, string memory symbol) public {
        emit transactions(from, to, amount, symbol, block.timestamp);
    }

    function addressRecipient(address recipient,string memory name) public{
         emit recipeints(msg.sender, recipient, name);
    }
}

//0x59EcE8FF3220034608798C977020c2eBfb179962 -Gorelli Test net deployed

// 0x57cb4f607e6ba3cc445feda9e48e464637891faf
