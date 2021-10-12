// buttons declarate
const Authors = document.getElementById('authors');
const BookName = document.getElementById('bookName');
const addAuthor = document.getElementById('addAuthor');
const addBook = document.getElementById('addBook');
const newAuthor = document.getElementById('newAuthor');
const addAuthorBtn = document.getElementById('addAuthorBtn');
const findBtn = document.getElementById('findBtn');
const indexAuthor = document.getElementById('indexAuthor');
const saveBtn = document.getElementById('save');
const cansellBtn = document.getElementById('cansell');
const searchBtn = document.getElementById('search');
const changeBook = document.getElementById('changeBook');
const saveBook = document.getElementById('saveBook');
const cansellMyBook = document.getElementById('cansellMyBook');
const addGenre = document.getElementById('addGenre');
const deleteBook = document.getElementById('deleteBook');
const deleteGenre = document.getElementById('deleteGenre');
// end buttons

// inputs declarate
let myName = document.getElementById('name');
let surname = document.getElementById('surname');
let middlename = document.getElementById('middlename');
let birth = document.getElementById('birth');
let bookName = document.getElementById('bookName');
let genre = document.getElementById('genre');
let pages = document.getElementById('pages'); 
let searchInput = document.getElementById('searchInput');
let inputAddGenre = document.getElementById('inputAddGenre');
let myForm = document.querySelector('.myForm');
// end inputs declarate

// div declarate
const displayAuthors = document.getElementById('displayAuthors');
const selectAuthors = document.getElementById('selectAuthors');
const showMyBook = document.getElementById('showMyBook');
const newBook = document.getElementById('newBook');
const changeDiv = document.getElementById('changeDiv');
const addOrChange = document.getElementById('addOrChange');
// end div

// for validation
let validName = document.getElementById('validName');
let validSurname = document.getElementById('validSurname');
let validMiddlename = document.getElementById('validmiddlename');
let validBirth = document.getElementById('validBirth');
let validBookName = document.getElementById('validBookName');
let validPages = document.getElementById('validPages');
let pattern1 = /[A-Za-z]/;
let pattern2 = /^[0-9]{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/;
let pattern3 = /[0-9]{1,10}/;

// end

let myAuthors;
let myBooks;
let castomGenre;
!localStorage.myAuthors ? myAuthors = [] : myAuthors = JSON.parse(localStorage.getItem('myAuthors'));
!localStorage.myBooks ? myBooks = [] : myBooks = JSON.parse(localStorage.getItem('myBooks'));
!localStorage.castomGenre ? castomGenre = [] : castomGenre = JSON.parse(localStorage.getItem('castomGenre'))

// func for create authors, books, genre
function MyAuthors(name,surname,birth,middlename){
      this.name = name;
      this.surname = surname;
      this.birth = birth;
      this.middlename = middlename; 
}
function MyBooks(author,bookName,genre,pages){
    this.author = author;
    this.bookName = bookName;
    this.genre = genre;
    this.pages = pages;
}
function CastomGenre (myGenre){
    this.myGenre = myGenre;
}
// end

const createList = (myAuthor,index)=>{
    let res = myBooks.filter(item=>item.author==(myAuthor.surname+' '+myAuthor.name)).length;
   
    return `
         <div class = 'authorDiv' >
            
            <div class="description">${myAuthor.surname} ${myAuthor.name} ${myAuthor.middlename}, DOB: ${myAuthor.birth}, number of books:${res}
            </div>
            <div class="buttons forAuthor" >
                <button  onclick = "changeAuthor(${index})" >Change</button>
                <button  onclick = "deleteAuthor(${index})" class="btnDelete">Delete</button>
                <button  onclick = "showBooks(${index})" >Show books</button>
                <button  onclick = "hideBooks(${index})" >Hide books</button>
            </div> 
            
        </div>
       
    `
}
const userGenre = ()=>{
    genre.innerHTML = '';
    if (castomGenre.length >0){
        castomGenre.forEach((item)=>{
            let newOption = document.createElement('option');
            newOption.innerHTML = item.myGenre;
            genre.append(newOption);
        });
    };
};
userGenre();

const showAuthorList = ()=>{
    displayAuthors.innerHTML = "";
    if(myAuthors.length >0){
        myAuthors.sort((a, b) => a.surname.localeCompare(b.surname))
        myAuthors.forEach((item,index)=>{
            displayAuthors.innerHTML += createList(item,index);
        })         
     };
}
showAuthorList();



const authorsLocal = ()=>{
    localStorage.setItem('myAuthors', JSON.stringify(myAuthors));
}
const booksLocal = ()=>{
    localStorage.setItem('myBooks', JSON.stringify(myBooks));
}
const genreLocal = ()=>{
    localStorage.setItem('castomGenre', JSON.stringify(castomGenre));
}
// add authors,books,genre
addGenre.addEventListener('click',()=>{
    castomGenre.push(new CastomGenre(inputAddGenre.value));
    inputAddGenre.value = '';
    genreLocal();
    authorsLocal();
    showAuthorList();
    selectAuthorsList();
    booksLocal();
    userGenre();

})

addAuthorBtn.addEventListener('click',function (e){
    // validation
    e.preventDefault();
    let isValid = true;
    let testName = pattern1.test(myName.value);
    let testSurname = pattern1.test(surname.value);
    let testBirth = pattern2.test(birth.value);
    let testMiddlename = pattern1.test(middlename.value);
    
    if(middlename.value != ""){
        if(!testMiddlename){
             isValid = false;
             validMiddlename.style.color = "red";
             validMiddlename.innerHTML = 'String needed';
        }else validMiddlename.innerHTML = ''
    }

    if(!testBirth||(birth.value =='')){
        isValid = false;
        validBirth.style.color = "red";
        validBirth.innerHTML = 'Please enter the correct format';
    }else validBirth.innerHTML = '';

    if(!testSurname||(surname.value =='')){
        isValid = false;
        validSurname.style.color = "red";
        validSurname.innerHTML = 'String needed';
    }else validSurname.innerHTML = '';

    if(!testName||(myName.value =='')){
        isValid = false;
        validName.style.color = "red";
        validName.innerHTML = 'String needed';
    }else validName.innerHTML = '';
    if(!isValid){
        return false
    }
   // end validation

   
    myAuthors.push(new MyAuthors(myName.value, surname.value, birth.value,middlename.value));
    authorsLocal();
    showAuthorList();
    selectAuthorsList();
    booksLocal();
    userGenre();
    
    myName.value = '';
    surname.value='';
    birth.value='';
    middlename.value='';
})


addBook.addEventListener('click', function (e){
      // validation
     e.preventDefault(e);
     let isValid = true;
     let testBookName = pattern1.test(BookName.value);
     let testPages = pattern3.test(pages.value);
 
     if(!testBookName||(bookName.value =='')){
         isValid = false;
         validBookName.style.color = "red";
         validBookName.innerHTML = 'String needed';
     }else validBookName.innerHTML = '';
 
     if(!testPages||(pages.value =='')){
         isValid = false;
         validPages.style.color = "red";
         validPages.innerHTML = 'Please enter only numbers';
     }else validPages.innerHTML = '';
     
     if(!isValid){
         return false
     };
    if (searchRes>=0){
         let castomBook = new MyBooks(selectAuthors.value, bookName.value, genre.value, pages.value);
         myBooks.splice(searchRes,1,castomBook);
         bookName.placeholder = "";
         pages.placeholder = "";
         addBook.innerHTML='Add';
         addOrChange.innerHTML = 'Add book';
    } else myBooks.push(new MyBooks(selectAuthors.value, bookName.value, genre.value, pages.value));
    showMyBook.hidden=true;
    booksLocal();
    authorsLocal();
    showAuthorList();
    selectAuthorsList();
    userGenre();


    bookName.value = "";
    pages.value = "";
})
// end

// delete/change Authors
const deleteAuthor = index =>{
     myAuthors.splice(index,1);
     authorsLocal();
     showAuthorList();
     selectAuthorsList();
     booksLocal();
     userGenre();
}

const changeAuthor = index=>{
    saveBtn.hidden = false;
    addAuthorBtn.hidden = true;
    myName.placeholder = myAuthors[index].name;
    surname.placeholder = myAuthors[index].surname;
    middlename.placeholder = myAuthors[index].middlename;
    birth.placeholder = myAuthors[index].birth;

    indexAuthor.innerHTML = ''
    indexAuthor.innerHTML = "Change athor: "+myAuthors[index].surname+" "+myAuthors[index].name+" "+myAuthors[index].middlename+", DOB: "+myAuthors[index].birth;
    saveBtn.addEventListener('click',function(e){
        // validation
        e.preventDefault();
        let isValid = true;
        let testName = pattern1.test(myName.value);
        let testSurname = pattern1.test(surname.value);
        let testBirth = pattern2.test(birth.value);
        let testMiddlename = pattern1.test(middlename.value);
        
        if(middlename.value != ""){
            if(!testMiddlename){
                 isValid = false;
                 validMiddlename.style.color = "red";
                 validMiddlename.innerHTML = 'String needed';
            }else validMiddlename.innerHTML = ''
        }
    
        if(!testBirth||(birth.value =='')){
            isValid = false;
            validBirth.style.color = "red";
            validBirth.innerHTML = 'Please enter the correct format';
        }else validBirth.innerHTML = '';
    
        if(!testSurname||(surname.value =='')){
            isValid = false;
            validSurname.style.color = "red";
            validSurname.innerHTML = 'String needed';
        }else validSurname.innerHTML = '';
    
        if(!testName||(myName.value =='')){
            isValid = false;
            validName.style.color = "red";
            validName.innerHTML = 'String needed';
        }else validName.innerHTML = '';
        if(!isValid){
            return false
        }
        // end validation
        
        let castomAuthor = new MyAuthors(myName.value, surname.value, birth.value,middlename.value);
        // change author in books mass
         myBooks.forEach((item)=>{
            if(item.author==(myAuthors[index].surname+' '+myAuthors[index].name)){
            item.author=(castomAuthor.surname+' '+castomAuthor.name);
            }
        })
        // end

        myAuthors.splice(index,1,castomAuthor);
        
        authorsLocal();
        showAuthorList();
        selectAuthorsList();
        booksLocal();
        userGenre();

        myName.value = '';
        surname.value='';
        birth.value='';
        middlename.value='';
    })
    
    cansellBtn.addEventListener('click',()=>{
        indexAuthor.innerHTML = "";
        myName.value = '';
        surname.value='';
        birth.value='';
        middlename.value='';
        myName.placeholder = "";
        surname.placeholder =""
        middlename.placeholder = "";
        birth.placeholder = "";
        cansellBtn.hidden = true;
        saveBtn.hidden = true;
    })
}
// end 

// create selectList of authors for books
const selectAuthorsList =()=>{
     selectAuthors.innerHTML = '';
     if (myAuthors.length > 0){
        myAuthors.forEach((item,index)=>{
           let myOption = document.createElement("option");
           myOption.innerHTML = myAuthors[index].surname+' '+myAuthors[index].name;
           selectAuthors.append(myOption);
        }) 
   }
    
}
selectAuthorsList();
// end

// search,show,hide books
const showBooks = (index)=>{
    showMyBook.hidden = false;
    showMyBook.innerHTML = "";
    let res = myBooks.filter(item=>item.author==(myAuthors[index].surname+' '+myAuthors[index].name));
    res.forEach(item=>{
        showMyBook.innerHTML += 'Book name: '+item.bookName+'; ';
    })
}
const hideBooks = ()=>{
    showMyBook.innerHTML = "";
}

// searh index by input nameBook
let searchRes;
searchBtn.addEventListener('click', ()=>{
        searchRes = myBooks.findIndex(item=>item.bookName==searchInput.value);
        if (searchRes == -1){
            newBook.innerHTML = "There is no book with that name"
        } else { newBook.innerHTML = myBooks[searchRes].author+' '+myBooks[searchRes].bookName+' '+myBooks[searchRes].genre+' '+myBooks[searchRes].pages;
                changeBook.hidden = false;
             }
})
// end

// change,delete,cansell book
changeBook.addEventListener('click',()=>{
    searchInput.value="";
    newBook.innerHTML = "";
    selectAuthors.value = myBooks[searchRes].author;
    genre.value = myBooks[searchRes].genre;
    bookName.placeholder = myBooks[searchRes].bookName;
    pages.placeholder = myBooks[searchRes].pages;
    addBook.innerHTML = 'Save';
    addOrChange.innerHTML = 'Change book';
    changeBook.hidden = true;

});

deleteBook.addEventListener('click',()=>{
    
    if (searchInput.value!=''){
        let res = myBooks.findIndex(item=>item.bookName==searchInput.value);
        if (res == -1){
            newBook.innerHTML = "There is no book with that name"
        } else myBooks.splice(res,1);
    }
        
    authorsLocal();
    showAuthorList();
    booksLocal();
    newBook.innerHTML = '';
    searchInput.value='';
    showMyBook.innerHTML=''
})

cansellMyBook.addEventListener('click',()=>{
    
    bookName.placeholder = "";
    pages.placeholder = "";
    changeDiv.hidden = true;
    
})

deleteGenre.addEventListener('click',()=>{
    if(inputAddGenre.value!=''){
        let res = castomGenre.findIndex(item=>item.myGenre==inputAddGenre.value);
        if (res == -1) {
            alarmSearchGenre.innerHTML = 'There is no genre with that name'
        }else castomGenre.splice(res,1);
    }
    userGenre();
    genreLocal();
    authorsLocal();
    showAuthorList();
    selectAuthorsList();
    booksLocal();
    
    inputAddGenre.value = '';
})
// end

