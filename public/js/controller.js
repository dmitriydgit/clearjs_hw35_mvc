(function() {

    class Controller { 
		constructor(model, view, observer) {
				this.model = model;
				this.view = view;
				this.observer = observer;
				this.user1;
		}     
		

		init() {
			//this.model.getData().then((data) => {
				//console.log(data);
				this.initView(/*data*/);
				this.model.setInfo(this.model.userInfo);
					//this.bindSubscribers();
				this.bindEvents();
			//});    
		}

		initView() {
			if(!this.view.isReady()) {
					this.view.init(); 
					this.view.user1 = this.view.getInfo();  
			}
			//this.view.isReady() || this.view.init(data);
		}
		bindEvents() {
			//this.DOMElements.form.addEventListener("keypress", this.initValidation.bind(this));
			this.view.DOMElements.submitBtn.addEventListener("click", (event) => {
					event.preventDefault();
					let item = this.view.getDataForValidation();
					this.validate(item).then(
						this.model.getData()
						.then(data => this.view.buildView(data)))
						.catch(error => console.log(error))   // не работает catch
					}
			);	


			this.view.DOMElements.backBtn.addEventListener("click", (event) => {
				event.preventDefault();
				this.view.goBack();
				this.model.setInfo(this.view.user1);
			});
			this.view.DOMElements.showUserDataBtn.addEventListener("click", (event) => {
				this.view.showUserDataBlock();
			});
			this.view.DOMElements.showGalleryBtn.addEventListener("click", (event) => {
				this.view.showGalleryBlock();
			});	
			this.view.DOMElements.togglePasswordBtn.addEventListener("click", (event) => {
				this.view.togglePasswordOutput();
			});

			this.view.DOMElements.sortBlock.addEventListener("change", (event) => {
				this.view.sortGallery()
			});
			this.view.DOMElements.resultBlock.addEventListener("click", (event) =>{
				this.view.deleteImage(event)
			}); 
		//	this.DOMElements.addNewImgBtn.addEventListener("click", this.addImage.bind(this));


			

			// this.view.DOMElements.saveBtn.addEventListener("click", () => {
			// 		let item = this.view.getItemToSave();
			// 		this.model.saveData(item).then(data => this.view.setSavedData(data));
			// });
			// this.view.DOMElements.refreshBtn.addEventListener("click", () => {
			// 		let count = this.view.counter++;
			// 		this.observer.callEvent("update", count);
			// });
	}
	validate (item) {
		let userData = item; //login + password
		let isEmailChecked = this.checkEmail (userData.login);
		let isPasswordChecked = this.checkPassword(userData.password);
		let isUserChecked = this.checkUser(userData.login, userData.password);
		
		//let isFieldsChecked = this.checkFields(login , password);
		
		
		let url = 'http://localhost:3000/login';
		let params = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userData)
		};

	
		return fetch(url , params).then(response => response.json())
		.then(response => {
			console.log("response" , response);
			if(isEmailChecked && isPasswordChecked && isUserChecked && response.status){   
				
				//localStorage.isUserLoggedIn = "true";
				//this.utils.setInfo(this.user1);
			return true;
			}  
		}) 
		


		// if(isEmailChecked && isPasswordChecked && isUserChecked){
		// 	return true;; 
		// } 
		// if (!isUserChecked ) {

		// }
		// if (!isEmailChecked ) {

		// }
		// if (!isPasswordChecked ) {

		// }

		
		
	};

	checkEmail (email) {                                                 
			let reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			return reg.test(email);
	};
	checkPassword(password){
			if(password.length >= 8){
					return true;
			} else {
				return false;
			}
	};
	checkFields (email, pass){
			// if ( !email) {
			//     this.utils.showHide1({"show" : [this.DOMEls.notFilledEmailMsg]});
			//     return false;
			// }
			// if ( !pass) {
			//     this.utils.showHide1({"show" : [this.DOMEls.notFilledPassMsg]});
			//     return false;
			// }
			// if ( !this.checkEmail(email)) {
			//     this.utils.showHide1({"show" : [this.DOMEls.wrongEmailMsg]});
			//     return false;
			// }
			// if ( !this.checkPassword(pass)) {
			//     this.utils.showHide1({"show" : [this.DOMEls.wrongPassMsg]});
			//     return false;
			// }
			return true;
	};
	
	checkUser(email, password) { 
		this.user1 = this.model.getInfo();                                        
			if(email === this.user1.email && password === this.user1.password) {
					console.log("itsok");
					return true;
			} else {
					return false;
			}
	};

        
        
    }

    window.app = window.app || {};
    window.app.Controller = Controller;

}());



//validate должно находится в контроллере?

// в валидейт нужно написать ив виде new Promise(   -- не получилось 
	//       function(resolve, reject) {            
		// 				resolve(iphone);          
		// 		}
		// );
		
		
		// в view прописать заполнение инпутов логина и пароля + +



/*

			
        bindEvents() {


            this.view.DOMElements.saveBtn.addEventListener("click", () => {
                let item = this.view.getItemToSave();
                this.model.saveData(item).then(data => this.view.setSavedData(data));
            });
            this.view.DOMElements.refreshBtn.addEventListener("click", () => {
                let count = this.view.counter++;
                this.observer.callEvent("update", count);
            });
        }

        bindSubscribers() {
            this.observer.subscribeEvent("update", (count) => {
                this.model.updateData(count).then((data) => {
                    this.view.setUpdatedData(data);
                });    
            });     
        }  
        
        initView(data) {
            if(!this.view.isReady()) {
                this.view.init(data);   
            }
            //this.view.isReady() || this.view.init(data);
        }
*/