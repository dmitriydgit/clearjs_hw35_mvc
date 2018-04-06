(function(){
    
    class Model {
			constructor(url , userInfo) {
					this.getUrl = url;
					this.userInfo = userInfo;
					this.user1;
					this.dataForGallery;
			}
	
			getData() {
					return fetch(this.getUrl).then(responce => responce.json())
					.then(data => {
							//this.dataForGallery = data;
							console.log("Initial data is loaded");
							return data;
					})         
			};

			setInfo(obj){
				localStorage.setItem("userInfo" , JSON.stringify(obj))
			};
			getInfo(){
				return JSON.parse(localStorage.getItem("userInfo"));
			};
    
    }
    
		window.app = window.app || {};
		window.app.Model = Model;
    
}())





// saveData(item) {         
// 	console.log("Saving item... " + item.name);
// 	let iphone = {
// 			"name": "Saved iPhone",
// 			"price": 12458,
// 			"popular": true,
// 			"date": 1467440203
// 	}
// 	return new Promise(
// 			function(resolve, reject) {            
// 					resolve(iphone);          
// 			}
// 	);
// }

// updateData(counter) {
// 	console.log("Updating item... " + counter);
// 	let samsung = {
// 			"name": "Saved Samsung",
// 			"price": 12458,
// 			"popular": true,
// 			"date": 1467440203
// 	}
// 	return Promise.resolve(samsung);
// }