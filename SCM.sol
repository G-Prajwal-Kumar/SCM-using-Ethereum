// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.13;

import "@openzeppelin/contracts/utils/Strings.sol";

contract SCM{

    struct requested{
        string owner;
        string fromLevel;
        string fromId;
        string product;
        uint quantity;
        string date;
        string approvedLevel;
        string approvedId;
    }

    struct loginDetails{
        string level;
        string belongsTo;
        string name;
        string password;
        mapping(string => uint) quantity;
        string[] Inventory;
        uint[] requestsOut;
        uint[] requestsIn;
    }
    
    mapping(uint => requested) requests;
    mapping(string => loginDetails) users;
    mapping(string => string[]) divs;
    string[] allDivs;
    string[] allUsers;

    string Manufacturer;
    string SupplyManager;
    address owner;
    uint ids = 0;

    constructor(){
        owner = msg.sender;

        loginDetails storage temp = users["18000"];
        temp.level = "DDST";
        temp.name = "Div - 1";
        temp.password = "testing";
        loginDetails storage tempy = users["18001"];
        tempy.level = "DDST";
        tempy.name = "Div - 1";
        tempy.password = "testing";
        loginDetails storage temp1 = users["19000"];
        temp1.level = "ADST";
        temp1.belongsTo = "18000";
        temp1.name = "Unit - 1";
        temp1.password = "testing";
        temp1.quantity["ak47"] = 64;
        temp1.quantity["mp90"] = 75;
        temp1.quantity["m16"] = 65;
        temp1.quantity["mines"] = 82;
        temp1.Inventory.push("ak47");
        temp1.Inventory.push("mp90");
        temp1.Inventory.push("m16");
        temp1.Inventory.push("mines");
        loginDetails storage tempx = users["19001"];
        tempx.level = "ADST";
        tempx.belongsTo = "18000";
        tempx.name = "Unit - 2";
        tempx.password = "testing";
        tempx.quantity["ak47"] = 75;
        tempx.quantity["mp90"] = 64;
        tempx.quantity["m16"] = 32;
        tempx.quantity["mines"] = 97;
        tempx.Inventory.push("ak47");
        tempx.Inventory.push("mp90");
        tempx.Inventory.push("m16");
        tempx.Inventory.push("mines");
        loginDetails storage temp0 = users["19002"];
        temp0.level = "ADST";
        temp0.belongsTo = "18000";
        temp0.name = "Unit - 1";
        temp0.password = "testing";
        temp0.quantity["ak47"] = 64;
        temp0.quantity["mp90"] = 75;
        temp0.quantity["m16"] = 65;
        temp0.quantity["mines"] = 82;
        temp0.Inventory.push("ak47");
        temp0.Inventory.push("mp90");
        temp0.Inventory.push("m16");
        temp0.Inventory.push("mines");
        loginDetails storage temp9 = users["19003"];
        temp9.level = "ADST";
        temp9.belongsTo = "18000";
        temp9.name = "Unit - 2";
        temp9.password = "testing";
        temp9.quantity["ak47"] = 75;
        temp9.quantity["mp90"] = 64;
        temp9.quantity["m16"] = 32;
        temp9.quantity["mines"] = 97;
        temp9.Inventory.push("ak47");
        temp9.Inventory.push("mp90");
        temp9.Inventory.push("m16");
        temp9.Inventory.push("mines");
        loginDetails storage temp2 = users["17000"];
        temp2.level = "DGST";
        temp2.name = "ASC";
        temp2.password = "testing";
        loginDetails storage temp3 = users["16000"];
        temp3.level = "Manufacturer";
        temp3.name = "Inc.";
        temp3.password = "testing";

        allUsers.push("19000");
        allUsers.push("19001");
        allUsers.push("19001");
        allUsers.push("19002");
        allUsers.push("18000");
        allUsers.push("18001");
        allUsers.push("17000");
        allUsers.push("16000");
        allDivs.push("18000");
        allDivs.push("18001");
        divs["18000"].push("19000");
        divs["18000"].push("19001");
        divs["18001"].push("19002");
        divs["18001"].push("19003");

        SupplyManager = "17000";
        Manufacturer = "16000";


    }

    function login(string memory id, string memory pass) public view returns(string memory){
        if(msg.sender == owner && bytes(id).length == 0) return "Admin";
        loginDetails storage temp = users[id];
        require((keccak256(bytes(temp.level)) != keccak256(bytes(""))) && (keccak256(bytes(temp.password)) == keccak256(bytes(pass))), "Invalid Credentials");
        return temp.level; 
    }

    function updateMFG_SM(string memory id, uint no) public{
        require(msg.sender == owner, "Not authorized to change the manufacturer");
        loginDetails storage temp = users[id];
        require(keccak256(bytes(temp.level)) == keccak256(bytes("Manufacturer")), "Not a Manufacturer");
        if(no == 0) Manufacturer = id;
        else if(no == 1) SupplyManager = id;
    }

    function createAccount(string memory id, string memory name, string memory level, string memory pass) public{
        require(msg.sender == owner, "Not authorized to create a Supplier");
        loginDetails storage temp = users[id];
        require(keccak256(bytes(temp.level)) == keccak256(bytes("")), "Id Already in Use");
        require((keccak256(bytes(level)) == keccak256(bytes("DGST"))) || (keccak256(bytes(level)) == keccak256(bytes("DDST"))) || (keccak256(bytes(level)) == keccak256(bytes("Manufacturer"))), "Invalid Level");
        temp.level = level;
        temp.name = name;
        temp.password = pass; 
        allUsers.push(id);
        if(keccak256(bytes(level)) == keccak256(bytes("DDST"))){
            allDivs.push(id);   
        }
    }

    function createUnit(string memory divId, string memory divPass, string memory id, string memory name, string memory pass) public{
        loginDetails storage temp1 = users[divId];
        require(keccak256(bytes(temp1.level)) == keccak256(bytes("DDST")), "Not a Division");
        require(keccak256(bytes(temp1.password)) == keccak256(bytes(divPass)), "Incorrect Password");
        loginDetails storage temp = users[id];
        require(keccak256(bytes(temp.level)) == keccak256(bytes("")), "Id Already in Use");
        temp.level = "DDST";
        temp.name = name;
        temp.password = pass; 
        temp.belongsTo = divId;
        allUsers.push(id);
        divs[divId].push(id);
    }

    function MFGgenerate(string memory id, string memory name, uint quantity, string memory pass) public{
        loginDetails storage temp = users[id];
        require(keccak256(bytes(temp.level)) == keccak256(bytes("Manufacturer")), "Not a Manufacturer");
        require(keccak256(bytes(temp.password)) == keccak256(bytes(pass)), "Incorrect Password");
        temp.quantity[name] += quantity;
        for(uint i=0; i<temp.Inventory.length; i++){
            if(keccak256(bytes(temp.Inventory[i])) == keccak256(bytes(name))) return;
        }
        temp.Inventory.push(name);
    }

    function MFGapprove(string memory id, uint reqId, string memory pass) public{
        loginDetails storage temp = users[id];
        requested storage temp1 = requests[reqId];
        require(keccak256(bytes(temp.level)) == keccak256(bytes("Manufacturer")), "Not a Manufacturer");
        require(keccak256(bytes(temp.password)) == keccak256(bytes(pass)), "Incorrect Password");
        require(keccak256(bytes(temp1.fromLevel)) == keccak256(bytes("DGST")), "Request not from a Supply Manager");
        require(temp.quantity[temp1.product] >= temp1.quantity, "Not Enough Inventory");
        temp.quantity[temp1.product] -= temp1.quantity;
        loginDetails storage temp2 = users[temp1.owner];
        temp2.quantity[temp1.product] += temp1.quantity;
        temp2.Inventory.push(temp1.product);
        temp1.fromLevel = "Manufacturer";
        temp1.fromId = id;
        temp1.approvedLevel = "Manufacturer";
        temp1.approvedId = id;
    }    

    function DGSTcheckDivs(string memory id, uint reqId, string memory pass) public returns(string memory){
        loginDetails storage temp1 = users[id];
        requested storage temp2 = requests[reqId];
        require(keccak256(bytes(temp1.level)) == keccak256(bytes("DGST")), "Not a Supply Manager");
        require(keccak256(bytes(temp1.password)) == keccak256(bytes(pass)), "Incorrect Password");
        require(keccak256(bytes(temp2.fromLevel)) == keccak256(bytes("DDST")), "Request not from a Division");
        loginDetails storage temp4 = users[temp2.owner];
        for(uint i=0; i<temp1.Inventory.length; i++){
            if(temp1.quantity[temp1.Inventory[i]] >= temp2.quantity){
                temp1.quantity[temp2.product] -= temp2.quantity;
                temp4.quantity[temp2.product] += temp2.quantity;
                temp2.fromLevel = "DGST";
                temp2.fromId = id;
                temp2.approvedLevel = "DGST";
                temp2.approvedId = id;
                return "Done";
            }
        }
        for(uint j=0; j<allDivs.length; j++){
            string[] memory temp = divs[allDivs[j]];
            for(uint i=0; i<temp.length; i++){
                loginDetails storage temp3 = users[temp[i]];
                if(temp3.quantity[temp2.product] >= temp2.quantity){
                    temp3.quantity[temp2.product] -= temp2.quantity;
                    if(temp4.quantity[temp2.product] == 0) temp4.Inventory.push(temp2.product);
                    temp4.quantity[temp2.product] += temp2.quantity;
                    temp2.fromLevel = "DGST";
                    temp2.fromId = id;
                    temp2.approvedLevel = "DGST";
                    temp2.approvedId = id;
                    return "Done";
                }
            }
        }
        loginDetails storage temp5 = users[Manufacturer];
        temp2.fromLevel = "DGST";
        temp2.fromId = id;
        temp1.requestsOut.push(reqId);
        temp5.requestsIn.push(reqId);
        return "No Inventory found. Requested Manufacturer";
    }

    function DDSTcheckUnits(string memory id, uint reqId, string memory pass) public returns(string memory){
        loginDetails storage temp1 = users[id];
        requested storage temp2 = requests[reqId];
        require(keccak256(bytes(temp1.level)) == keccak256(bytes("DDST")), "Not a Division");
        require(keccak256(bytes(temp1.password)) == keccak256(bytes(pass)), "Incorrect Password");
        require(keccak256(bytes(temp2.fromLevel)) == keccak256(bytes("ADST")), "Request not from a Unit");
        string[] memory temp = divs[temp1.belongsTo];
        for(uint i=0; i<temp.length; i++){
            loginDetails storage temp3 = users[temp[i]];
            if(temp3.quantity[temp2.product] >= temp2.quantity){
                temp3.quantity[temp2.product] -= temp2.quantity;
                loginDetails storage temp4 = users[temp2.owner];
                if(temp4.quantity[temp2.product] == 0) temp4.Inventory.push(temp2.product);
                temp4.quantity[temp2.product] += temp2.quantity;
                temp2.fromLevel = "DDST";
                temp2.fromId = id;
                temp2.approvedLevel = "DDST";
                temp2.approvedId = id;
                return "Done";
            }
        }   
        loginDetails storage temp5 = users[SupplyManager];
        temp2.fromLevel = "DDST";
        temp2.fromId = id;
        temp1.requestsOut.push(reqId);
        temp5.requestsIn.push(reqId);
        return "No Inventory found. Request forwarded to DGST";
    }

    function ADSTrequestCreate(string memory id, string memory product, uint quantity, string memory date, string memory pass) public{
        loginDetails storage temp1 = users[id];
        require(keccak256(bytes(temp1.level)) == keccak256(bytes("ADST")), "Not a Unit");
        require(keccak256(bytes(temp1.password)) == keccak256(bytes(pass)), "Incorrect Password");
        requested storage temp = requests[ids];
        ids += 1;
        temp.owner = id;
        temp.fromLevel = "ADST";
        temp.fromId = id;
        temp.product = product;
        temp.quantity = quantity;
        temp.date = date;
        temp1.requestsOut.push(ids-1);
        users[temp1.belongsTo].requestsIn.push(ids-1);
    }

    function DGSTrequestCreate(string memory id, string memory product, uint quantity, string memory date, string memory pass) public {
        loginDetails storage temp1 = users[id];
        require(keccak256(bytes(temp1.level)) == keccak256(bytes("DGST")), "Not a Supply Manager");
        require(keccak256(bytes(temp1.password)) == keccak256(bytes(pass)), "Incorrect Password");
        requested storage temp = requests[ids];
        ids += 1;
        temp.owner = id;
        temp.fromLevel = "DGST";
        temp.fromId = id;
        temp.product = product;
        temp.quantity = quantity;
        temp.date = date;
        temp1.requestsOut.push(ids-1);
        loginDetails storage temp5 = users[Manufacturer];
        temp5.requestsIn.push(ids-1);
    }

    function DGSTsupplyDDST(string memory supId, string memory pass, string memory id, string memory product, uint quantity) public {
        loginDetails storage temp1 = users[supId];
        require(keccak256(bytes(temp1.level)) == keccak256(bytes("DGST")), "Not a Supply Manager");
        require(keccak256(bytes(temp1.password)) == keccak256(bytes(pass)), "Incorrect Password");
        require(temp1.quantity[product] >= quantity, "Not enough Inventory");
        temp1.quantity[product] -= quantity;
        loginDetails storage temp = users[id];
        temp.quantity[product] += quantity;
        temp.Inventory.push(product);
    }

    function DDSTsupplyADST(string memory supId, string memory pass, string memory id, string memory product, uint quantity) public {
        loginDetails storage temp1 = users[supId];
        require(keccak256(bytes(temp1.level)) == keccak256(bytes("DDST")), "Not a Division");
        require(keccak256(bytes(temp1.password)) == keccak256(bytes(pass)), "Incorrect Password");
        require(temp1.quantity[product] >= quantity, "Not enough Inventory");
        loginDetails storage temp = users[id];
        temp.quantity[product] += quantity;
        temp.Inventory.push(product);
    }

    function getUsers() public view returns (string memory){
        require(msg.sender == owner, "Accessable only by owner");
        string memory res ="{";
        for(uint x = 0; x<allUsers.length; x++){
            loginDetails storage temp1 = users[allUsers[x]];
            res = string.concat(res, '"', allUsers[x], '"', ":", "{", '"',"Level",'"',":",'"',temp1.level, '"', ",", '"',"Name",'"',":",'"',temp1.name, '"', ",", '"',"Password",'"',":",'"',temp1.password, '"},');
        }
        res = string.concat(res, '"dummy"', ":", '""', '}');
        return res;
    }

    function viewInventory(string memory id, string memory pass) public view returns (string memory){
        loginDetails storage temp = users[id];
        require(keccak256(bytes(temp.password)) == keccak256(bytes(pass)), "Incorrect Password");
        string memory res = "{";
        for(uint i=0; i<temp.Inventory.length; i++){
            res = string.concat(res, '"',temp.Inventory[i],'"',":",'"',Strings.toString(temp.quantity[temp.Inventory[i]]),'",');
        }
        res = string.concat(res, '"dummy"', ":", '""', '}');
        return res;
    }

    function viewRequestsOut(string memory id, string memory pass) public view returns (string memory){
        loginDetails storage temp = users[id];
        require(keccak256(bytes(temp.password)) == keccak256(bytes(pass)), "Incorrect Password");
        string memory res = "{";
        for(uint i=0; i<temp.requestsOut.length; i++){
            requested storage temp1 = requests[temp.requestsOut[i]];
            res = string.concat(res, '"', Strings.toString(temp.requestsOut[i]), '"', ":{", '"Owner"', ":", '"', temp1.owner,'"',",", '"fromLevel"', ":", '"', temp1.fromLevel,'"',",", '"fromId"', ":", '"', temp1.fromId,'"',",", '"Product"', ":", '"', temp1.product,'"',",", '"Quantity"', ":", '"', Strings.toString(temp1.quantity),'"',",", '"Date"', ":", '"', temp1.date,'"',",", '"ApprovedLevel"', ":", '"', temp1.approvedLevel,'"',",", '"ApprovedId"', ":", '"', temp1.approvedId,'"',"},");
        }
        res = string.concat(res, '"dummy"', ":", '""', '}');
        return res;
    }

    function viewRequestsIn(string memory id, string memory pass) public view returns (string memory){
        loginDetails storage temp = users[id];
        require(keccak256(bytes(temp.password)) == keccak256(bytes(pass)), "Incorrect Password");
        string memory res = "{";
        for(uint i=0; i<temp.requestsIn.length; i++){
            requested storage temp1 = requests[temp.requestsIn[i]];
            res = string.concat(res, '"', Strings.toString(temp.requestsIn[i]), '"', ":{", '"Owner"', ":", '"', temp1.owner,'"',",", '"fromLevel"', ":", '"', temp1.fromLevel,'"',",", '"fromId"', ":", '"', temp1.fromId,'"',",", '"Product"', ":", '"', temp1.product,'"',",", '"Quantity"', ":", '"', Strings.toString(temp1.quantity),'"',",", '"Date"', ":", '"', temp1.date,'"',",", '"ApprovedLevel"', ":", '"', temp1.approvedLevel,'"',",", '"ApprovedId"', ":", '"', temp1.approvedId,'"',"},");
        }
        res = string.concat(res, '"dummy"', ":", '""', '}');
        return res;
    }
    
    function viewVals()public view returns(string memory, string memory){
        require(msg.sender == owner, "Not authorized");
        return(Manufacturer, SupplyManager);
    }

    function viewAllInfo(string memory id, string memory pass) public view returns(string memory){
        loginDetails storage temp = users[id];
        require(keccak256(bytes(temp.password)) == keccak256(bytes(pass)), "Incorrect Password");
        string memory res = string.concat("{", '"Level"', ":", '"', temp.level, '"', ",", '"BelongsTo"', ":", '"', temp.belongsTo, '"', ",", '"Name"', ":", '"', temp.name, '"', ",", '"Password"', ":", '"', temp.password, '"', ",");
        string memory inv = viewInventory(id, pass);
        string memory reqOut = viewRequestsOut(id, pass);
        string memory reqIn = viewRequestsIn(id, pass);
        res = string.concat(res, '"Inventory"', ":", inv, ",",'"RequestsOut"', ":", reqOut, ",",'"RequestsIn"', ":", reqIn, "}");
        return res;
    }

    function DGSTviewInventory(string memory id, string memory pass) public view returns(string memory){
        loginDetails storage temp1 = users[id];
        require(keccak256(bytes(temp1.level)) == keccak256(bytes("DGST")), "Not a Supply Manager");
        require(keccak256(bytes(temp1.password)) == keccak256(bytes(pass)), "Incorrect Password");
        string memory res = "{";
        for(uint i=0; i<allDivs.length; i++){
            string[] memory temp3 = divs[allDivs[i]];
            for(uint j=0; j<temp3.length; j++){
                loginDetails storage temp4 = users[temp3[j]];
                res = string.concat(res, '"', temp3[j], '"', ":", "{");
                for(uint p=0; p<temp4.Inventory.length; p++){
                    res = string.concat(res, '"', temp4.Inventory[p], '"', ":", '"', Strings.toString(temp4.quantity[temp4.Inventory[p]]), '"', ",");
                }
                res = string.concat(res, '"dummy"',  ":", '""', "} , ");
            }
            // res = string.concat(res, '"dummy"',  ":", '""', "} , ");
        }   
        res = string.concat(res, '"dummy"',  ":", '""', "}");
        return res;
    }

    function DDSTviewInventory(string memory id, string memory pass) public view returns(string memory){
        loginDetails storage temp1 = users[id];
        require(keccak256(bytes(temp1.level)) == keccak256(bytes("DDST")), "Not a Division");
        require(keccak256(bytes(temp1.password)) == keccak256(bytes(pass)), "Incorrect Password");
        string memory res = "{";
        string[] memory temp3 = divs[id];
        for(uint j=0; j<temp3.length; j++){
            loginDetails storage temp4 = users[temp3[j]];
            res = string.concat(res, '"', temp3[j], '"', ":", "{");
            for(uint p=0; p<temp4.Inventory.length; p++){
                res = string.concat(res, '"', temp4.Inventory[p], '"', ":", '"', Strings.toString(temp4.quantity[temp4.Inventory[p]]), '"', ",");
            }
            res = string.concat(res, '"dummy"',  ":", '""', "} , ");
        }
        res = string.concat(res, '"dummy"',  ":", '""', "}");
        return res;
    }

    // function viewInventory(string memory id, string memory pass) public view returns(string memory){
    //     loginDetails storage temp1 = users[id];
    //     require(keccak256(bytes(temp1.level)) == keccak256(bytes("Manufacturer")) || keccak256(bytes(temp1.level)) == keccak256(bytes("DGST")) || keccak256(bytes(temp1.level)) == keccak256(bytes("DDST")), "Not Authorized");
    //     require(keccak256(bytes(temp1.password)) == keccak256(bytes(pass)), "Incorrect Password");
    //     string memory res = "{";
    //     for(uint i=0; i<temp1.Inventory.length; i++){
    //         res = string.concat(res, '"', temp1.Inventory[i], '"', ":", '"', Strings.toString(temp1.quantity[temp1.Inventory[i]]), '" ,');
    //     }
    //     res = string.concat(res, '"dummy"', ":", '""', "}");
    //     return res;
    // }
}