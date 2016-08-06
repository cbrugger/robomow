var noble = require('../index');

var serviceUuids = ['ff00a501d020913c123456d97200a6a6']; 
var allowDuplicates = false; 

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
	noble.startScanning();
// noble.startScanning(serviceUuids, allowDuplicates);
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', function(peripheral) {
	  peripheral.connect(function(error) {
		    console.log('connected to peripheral: ' + peripheral.uuid);
		    peripheral.discoverServices(null, function(error, services) {
		      var deviceInformationService = services[0];
		      console.log('discovered device information service');

		      deviceInformationService.discoverCharacteristics(null, function(error, characteristics) {
		        console.log('discovered the following characteristics:');
		        for (var i in characteristics) {
		          console.log('  ' + i + ' uuid: ' + characteristics[i].uuid);
		          if (characteristics[i].uuid == '2a00') { 
			          var manufacturerNameCharacteristic = characteristics[i];
			          console.log('discovered manufacturer name characteristic');
	
			          manufacturerNameCharacteristic.read(function(error, data) {
			            // data is a buffer
			            console.log('manufacture name is: ' + data.toString('utf8'));
			          });
		          }
		          
		          if (characteristics[i].uuid == '2a01') { 
			          var manufacturerNameCharacteristic = characteristics[i];
			          console.log('discovered appearance name characteristic');
	
			          manufacturerNameCharacteristic.read(function(error, data) {
			            // data is a buffer
			            console.log('appearance is: ' + data.toString('utf8'));
			          });
		          }
		        }
		      });
		    });
		  });
	
// console.log('peripheral discovered (' + peripheral.id +
// ' with address <' + peripheral.address + ', ' + peripheral.addressType + '>,'
// +
// ' connectable ' + peripheral.connectable + ',' +
// ' RSSI ' + peripheral.rssi + ':');
// console.log('\thello my local name is:');
// console.log('\t\t' + peripheral.advertisement.localName);
// console.log('\tcan I interest you in any of the following advertised
// services:');
// console.log('\t\t' + JSON.stringify(peripheral.advertisement.serviceUuids));
//
// var serviceData = peripheral.advertisement.serviceData;
// if (serviceData && serviceData.length) {
// console.log('\there is my service data:');
// for (var i in serviceData) {
// console.log('\t\t' + JSON.stringify(serviceData[i].uuid) + ': ' +
// JSON.stringify(serviceData[i].data.toString('hex')));
// }
// }
// if (peripheral.advertisement.manufacturerData) {
// console.log('\there is my manufacturer data:');
// console.log('\t\t' +
// JSON.stringify(peripheral.advertisement.manufacturerData.toString('hex')));
// }
// if (peripheral.advertisement.txPowerLevel !== undefined) {
// console.log('\tmy TX power level is:');
// console.log('\t\t' + peripheral.advertisement.txPowerLevel);
// }

  
  
  console.log();
});

