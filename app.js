// TODO: Paste the Firebase initialization code first

// Initialize Firebase
var config = {
	apiKey: "AIzaSyAvqFB4q2j7ZektW6_wvSk_4c2zm3odccc",
	authDomain: "fir-project-7fa52.firebaseapp.com",
	databaseURL: "https://fir-project-7fa52.firebaseio.com",
	storageBucket: "",
};
firebase.initializeApp(config);

// TODO: Your code below
/*firebase.database().ref('tasks/').push({
  title: 'Learn CRUD',
  done: true
});

firebase.database().ref('tasks/').set({
  abc123: {
    title: 'Overwrite data',
    done: true
  }
});

firebase.database().ref('tasks/xyz890/').set({
  title: 'Set new data',
  done: true
});
firebase.database().ref('tasks/xyz890').update({
  title: 'Updated value'
});

firebase.database().ref('tasks/xyz890').remove()
firebase.database().ref('tasks/abc123').remove()
*/

delegate("body","click","#add",(event) => {
	var inputId=document.querySelector("#new-item");
	var inputValue=inputId.value;
	firebase.database().ref('tasks/').push({
	  listItem: inputValue,
	  checkedData: false
	});
})	
var container=document.querySelector(".container");
var buttonContainer=document.querySelector(".buttonContainer")
renderInput(buttonContainer)

/*render input button area*/
function renderInput(into){
	into.innerHTML = `
		<input type="text" id="new-item" />
 		<button id="add">Add</button>
		<button id="delete">Delete</button>
	`
}	

function renderList(listData, into){
	if (listData != null && listData !==''){
		var listItemData=Object.keys(listData).map((key)=>{
			return `${renderListItem(listData[key].listItem)}`
		}).join('')
	}
	into.innerHTML=`
		<ul>
		${listItemData}
		</ul>
	`
}

function renderListItem(listItem){
	return `
		<li><input type="checkbox" class="checkboxClass" data-label="${listItem}">${listItem}</li>
	`	
}

firebase.database().ref('tasks/').on('value', function(snapshot) {
	var data=snapshot.val();
	if (data != null && data !==''){
		renderList(data, container);
	}
	delegate(".container","click","input.checkboxClass",(event) => {
		if(event.target.checked){
			Object.keys(data).map((itemKey)=>{
				if(event.target.getAttribute('data-label')==data[itemKey].listItem){
					firebase.database().ref('tasks/'+itemKey).update({
					  checkedData: true
					});
				}
			});
			
		}else{
			Object.keys(data).map((itemKey)=>{
				if(event.target.getAttribute('data-label')==data[itemKey].listItem){
					firebase.database().ref('tasks/'+itemKey).update({
					  checkedData: false
					});
				}
			});
		}
				
	});
	
	delegate(".buttonContainer","click","#delete",(event) => {
		if (data != null && data !==''){
			Object.keys(data).map((itemKey)=>{
				var dataResult=data[itemKey];
				if(dataResult){
					if(dataResult.checkedData){
						firebase.database().ref('tasks/'+itemKey).remove()
					}
				}
			});
		}
	});			
});