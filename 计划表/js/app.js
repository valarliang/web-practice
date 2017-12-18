
var store={
	save(key,value){
		localStorage.setItem(key,JSON.stringify(value));
	},
	fetch(key){
		return JSON.parse(localStorage.getItem(key)) || [];
	}
}


var list =store.fetch('a');
var hashList={
		all(list){
			return list;
		},
		unfinished(list){
			return list.filter(function (item) {
				return !item.isChecked;
			})
		},
		done(list){
			return list.filter(function (item) {
				return item.isChecked;
			})
		}
	};

var vm=new Vue({
		el:".main",
		data:{
			list:list,
			todo:"",
			edtorTodos:'', 
			beforeTitle:'', 
			hash:'all'
		},
		watch:{
			list:{
				handler(){
					store.save('a',this.list);
				},
				deep:true
			}
		},
		computed:{
			noCheckeLength(){
				return this.list.filter(function(item){
	                return !item.isChecked
	            }).length
			},
			filterList(){
				return hashList[this.hash]? hashList[this.hash](list):list;
			}
		},
		methods:{
			addTodo(){  
				this.list.push({
					title:this.todo,
					isChecked:false
				});
				this.todo = '';
			},
			deleteTodo(item){ 
				var index = this.list.indexOf(item);
				this.list.splice(index,1);
			},
			edtorTodo(item){ 
				this.beforeTitle = item.title;
				this.edtorTodos = item;
			},
			edtorTodoed(){ 
				this.edtorTodos = '';
			},
			cancelTodo(item){  
				item.title = this.beforeTitle;
				this.beforeTitle = '';
				this.edtorTodos = '';
			}
		},
		directives:{
			"foucs":{
				update(el,binding){
					if(binding.value){
						el.focus();
					}
				}
			}
		}
	});
function hashvalue() {
	var hash=window.location.hash.slice(1);
	vm.hash=hash;
};
hashvalue()

window.addEventListener('hashchange',hashvalue);