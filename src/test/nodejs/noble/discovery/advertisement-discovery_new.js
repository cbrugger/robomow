var noble = require('../index');

var serviceUuids = ['ff00a501d020913c123456d97200a6a6']; 
var allowDuplicates = true; 

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
//	noble.startScanning();
    noble.startScanning(serviceUuids, allowDuplicates);
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
//		          if (characteristics[i].uuid == '2a00') { 
//			          var manufacturerNameCharacteristic = characteristics[i];
//			          console.log('discovered manufacturer name characteristic');
//	
//			          manufacturerNameCharacteristic.read(function(error, data) {
//			            // data is a buffer
//			            console.log('manufacture name is: ' + data.toString('utf8'));
//			          });
//		          }
//		          
//		          if (characteristics[i].uuid == '2a01') { 
//			          var manufacturerNameCharacteristic = characteristics[i];
//			          console.log('discovered appearance name characteristic');
//	
//			          manufacturerNameCharacteristic.read(function(error, data) {
//			            // data is a buffer
//			            console.log('appearance is: ' + data.toString('utf8'));
//			          });
//		          }
		        }
		      });
		    });
		  peripheral.disconnect(function(error) {
	       console.log('disconnected from peripheral: ' + peripheral.uuid);
	    });

	  });
	
  
  console.log();
});

