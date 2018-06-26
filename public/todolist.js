window.add=this.document.getElementById('add');
    window.deletebtn=this.document.getElementById('delete');
    window.sort=this.document.getElementById('sort');
    window.list=this.document.getElementById('list');
    window.input=this.document.getElementById('input');
    let array=[];
    var obje={};
    console.log($);
    
    var data1=$.ajax({
            url : '/json',
            async : false
    });

    var data=data1.responseJSON;
    if(typeof data!="undefined"){
        var temp=data;
        for(var i=0;i<temp.length;i++){
        array.push( giveli( temp[i].name, temp[i].checked )) ;
        list.appendChild( array[i] ) ;
        }
        updatebuttons();

    }
    console.log(data1);
    //console.log("start " + (typeof array) + " " + array.length) ;

    //  if (localStorage.getItem('key6') !== null) {
    //      while(list.firstChild) {
    //          list.removeChild( list.firstChild ) ;
    //      }
    //      //this.console.log( "" )
    //      let temp = JSON.parse(localStorage.getItem('key6')) ;
    //      for(var i=0;i<temp.length;i++){
    //          array.push( giveli( temp[i].name, temp[i].checked )) ;
    //          list.appendChild( array[i] ) ;
    //      }
    //       updatebuttons();
    //  }

     function save_list () {

        var array_items = [] ;
        //console.log(array.length) ;
        for ( i = 0 ; i < array.length ; i++ ) {
            var obj = {} ;
            obj.name =  array[i].childNodes[0].childNodes[0].childNodes[1].innerText ;
            obj.checked = (array[i].childNodes[0].childNodes[0].childNodes[1].className == "form-control setcolor") ;
            array_items.push(obj) ;
        }

        //console.log( array_items ) ;

        $.post(
            '/json',
            {
                'json':JSON.stringify(array_items)
            },
            function(){

            }
        )
        // localStorage.setItem( 'key6' , JSON.stringify(array_items) ) ;

     }

    function giveli(task,checked){

        console.log(task + " " + checked) ;

        let li=document.createElement('li');
        let div1=document.createElement('div');
        div1.className="item border-success rounded";
        let div2=document.createElement('div');
        div2.className="input-group mb-3 lis";
        div1.appendChild(div2);
        let div3=document.createElement('div');
        div3.className="input-group-prepend";
        div2.appendChild(div3);
        let div4=document.createElement('div');
        div4.className="input-group-text div4";
        div3.appendChild(div4);
        let chkbx=document.createElement('input');
        chkbx.setAttribute('type','checkbox');
        chkbx.className="chkbx";
        

        let span=document.createElement('span');
        if (checked === false) {
            chkbx.checked = false ;
            span.className="form-control";
            span.style.textDecoration='none';
        }else {
            chkbx.checked = true ;
            span.style.textDecoration='line-through';
            span.className="form-control setcolor";
        }
        div4.appendChild(chkbx);
        span.innerText=task;
        div2.appendChild(span);
        
        let div5=document.createElement('div');
        div5.className="updowndiv";

        let btnup=document.createElement('button');
        btnup.className="btn btn-info btn-md";
        let iup=document.createElement('i');
        iup.setAttribute('class','fas fa-arrow-up');
        btnup.appendChild(iup);
        btnup.innerHTML=btnup.innerHTML+"MOVE UP";
        div5.appendChild(btnup);
        btnup.setAttribute("margin-right","5px");
        let btndown=document.createElement('button');
        btndown.className="btn btn-success btn-md"
        let idown=document.createElement('i');
        idown.setAttribute('class','fas fa-arrow-down');
        btndown.appendChild(idown);
        btndown.innerHTML=btndown.innerHTML+"MOVE DOWN";
        div5.appendChild(btndown);
        div1.appendChild(div5);
        li.appendChild(div1);

        chkbx.onchange=function(event){
            if(chkbx.checked===true){
                span.style.textDecoration='line-through';
                span.className="form-control setcolor";
            }else{

                span.style.textDecoration='none';
                span.className="form-control";
            }
            save_list() ;

        };


        btnup.onclick=function(){
            let liprevious=li.previousSibling;
            if (liprevious ) {
                var idx=array.indexOf(liprevious);
                if(idx===0){
                    liprevious.children[0].children[1].children[0].style.display="inline";
                    li.children[0].children[1].children[0].style.display="none";
                }
                if(idx===array.length-2){
                    liprevious.children[0].children[1].children[1].style.display="none";
                    li.children[0].children[1].children[1].style.display="inline";
                }
                li.parentNode.insertBefore(li, liprevious);
                swap(li,liprevious);
            }
            save_list() ;
        };

        
        btndown.onclick=function(){
            let linext=li.nextSibling;
            if (linext ) {
                var idx=array.indexOf(linext);
                if(idx===1){
                    linext.children[0].children[1].children[0].style.display="none";
                    li.children[0].children[1].children[0].style.display="inline";
                }
                if(idx===array.length-1){
                    linext.children[0].children[1].children[1].style.display="inline";
                    li.children[0].children[1].children[1].style.display="none";
                }
                
                li.parentNode.insertBefore(li, linext);
                swap(li,linext);
            }

            
            if (li.nextSibling ) {
                li.parentNode.insertBefore(li.nextSibling,li);
            }
            save_list() ;
        };


        return li ;

    }
deletebtn.onclick=function(){
    sortstrike();
    
    while(array.length>0 && array[array.length-1].children[0].children[0].children[0].children[0].children[0].checked){
         array.pop();
    }
    createfreshdata();
    updatebuttons();
    save_list();
}

    add.onclick=function(){
        addnewelement();
    };
    input.onkeypress=function (event){
        if (event.keyCode == 13 || event.which == 13){
            addnewelement();
        }
    }
    function addnewelement(){
        var task=input.value;
        if(task.length<=0){
            return ;
        }
        //console.log("debug " + (typeof array)) ;
        var liref=giveli(task,false);
        array.push(liref) ;

        //console.log( liref )
        
        //console.log(typeof liref);

        obje["0"]=array.toString();
        updatebuttons();
        list.appendChild(liref);
        input.value="";
        
        save_list();
        
        //localStorage.setItem("key2",JSON.stringify(array));
    }
    

    sort.onclick=function(){
        
        if(array.length<=0){
            return;
        }
        sortstrike();
        save_list();
    };
    function sortstrike(){
        var strikea=[];
        var nstrikea=[];
        array[0].children[0].children[1].children[0].style.display="inline";
        array[array.length-1].children[0].children[1].children[1].style.display="inline";
        for(var i=0;i<array.length;i++){
            
            if(array[i].children[0].children[0].children[0].children[0].children[0].checked===true){
                strikea.push(array[i]);
            }else{
                nstrikea.push(array[i]);
            }
        }
        array=[];
        for(var j=0;j<nstrikea.length;j++){
            array.push(nstrikea[j]);
            
        }
        for(var k=0;k<strikea.length;k++){
            array.push(strikea[k]);
        }
        createfreshdata();
        updatebuttons();
        

    }
    function createfreshdata(){
        while (list.hasChildNodes()) {   
            list.removeChild(list.firstChild);
        }
        for(var m=0;m<array.length;m++){
            list.appendChild(array[m]);
        }
    }

    function updatebuttons(){
        let lilast=array[array.length-1];
        let lifirst=array[0];
        
        if(array.length>=2){
            let liseclast=array[array.length-2];
            let upbtn=liseclast.children[0].children[1].children[0];
            let downbtn=liseclast.children[0].children[1].children[1];
             upbtn.style.display="inline";
             downbtn.style.display="inline";

        }
        if(array.length>=1){
         lifirst.children[0].children[1].children[0].style.display="none";
         lilast.children[0].children[1].children[1].style.display="none";
        }
    }

    function swap(li1,li2){
        var temp=li2;
        var idx1=array.indexOf(li1);
        var idx2=array.indexOf(li2);
        array[idx2]=li1;
        array[idx1]=temp;
    }


