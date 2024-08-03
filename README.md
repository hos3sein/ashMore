# Approve service

This system for request for add new group to user

## install

```
npm install
```

## run project

```
npm run dev
```

```
SERVER : http://121.41.58.117:6003/api/v1/approve
LOCAL : http://localhost:6003/api/v1/approve
PORT : 6003
```

### request to join group

##### URL : /request

##### Method : POST

##

###

| Parameter             | Type     | Description         |
| :-------------------- | :------- | :------------------ |
| `group`               | `String` | **Required**.       |
| `companyName`         | `String` | **Required**.       |
| `companyLicensePhoto` | `String` | **Required**.       |
| `companyAddress`      | `Obj`    | **Required**.       |
| `idCard`              | `Number` | **Required**.       |
| `idCardPhoto`         | `String` | **Required**.       |
| `truckType`           | `Number` | **Required**,       |
| `truckPlate`          | `String` | **Required**.       |
| `truckPlatePhoto`     | `String` | **Required**.       |
| `transportCapacity`   | `Number` | **Required**.max:32 |
| `profileCompany`      | `String` | **Required**.       |
| `depositAmount`       | `Number` | **Required**.       |

address: { type: String },

#

nameAddress: { type: String },

#

latitude: { type: Number },

#

longitude: { type: Number },

#

target: { type: Number },

#

city: { type: String },

#

province: { type: String },

#

district: { type: String },

#

street: { type: String },

#

number: { type: String },

### all request me

##### URL : /allrequestme

##### Method : GET

##

### approve request

##### URL : /approverequest/:pendingRequest

##### Method : GET

##
