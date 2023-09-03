"use strict";
document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "interactive") {
    document.getElementById("loading").style.display = "flex";
  }

  // When window loaded ( external resources are loaded too- `css`,`src`, etc...)
  if (event.target.readyState === "complete") {
    document.getElementById("loading").style.display = "none";
     // ___________________________navbar_________________________
    let openNav = document.getElementById("openNav");
    let closeNav = document.getElementById("closeNav");
    let navbar = document.getElementById("navbar");
    // ___________________________navbar links_________________________
    let navLinks = document.querySelectorAll(".links a");
    let searchLink = document.getElementById("searchLink");
    let categoriesLink = document.getElementById("categoriesLink");
    let areaLink = document.getElementById("areaLink");
    let ingredientsLink = document.getElementById("ingredientsLink");
    let contactLink = document.getElementById("contactLink");
    // ___________________________navbar links_________________________
    // ___________________________navbar_________________________
    let displayData = document.getElementById("maelsList");
    // ___________________________Searsch inputs_________________________
    let searchInp = document.getElementById("searchInp");
    let searchName = document.getElementById("searchName");
    let searchFirst = document.getElementById("searchFirst");
    // ___________________________Searsch inputs_________________________
    // ___________________________Login inputs_________________________
    let loginInput = document.getElementById('loginInput');
    let userNameInp = document.getElementById('userName');
    let userEmailInp = document.getElementById('userEmail');
    let userPhoneInp = document.getElementById('userPhone');
    let userAgeInp = document.getElementById('userAge');
    let userPassInp = document.getElementById('userPass');
    let userRepassInp = document.getElementById('userRepass');
    let SubmitBtn = document.getElementById('SubmitBtn');
    // ___________________________Login inputs_________________________

    async function getMeals() {
      let myHttp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s="
      );
      let myResp = await myHttp.json();
      let myData = myResp.meals;
      display(myData);
      loginInput.style.display = "none";
    }
    getMeals();
    function display(arr) {
      let temp = "";
      for (let i = 0; i < arr.length; i++) {
        temp += `<div mealId="${arr[i].idMeal}" class="sh col-md-3">
        <div class="content position-relative overflow-hidden rounded-3">
            <img src="${arr[i].strMealThumb}" alt="" class="w-100">
            <div class="mael-name position-absolute h-100 start-0 end-0 d-flex align-items-center">
                <h2>${arr[i].strMeal}</h2>
            </div>
        </div>
    </div>`;
      }
      displayData.innerHTML = temp;
      let action = displayData.childNodes;
      for (let index = 0; index < action.length; index++) {
        action[index].addEventListener("click", function () {
          let id = action[index].getAttribute("mealId");
          console.log(id);
          getMealDesc(id);
        });
      }
    }

    // ___________________________close & open navbar_________________________
    for (let i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener("click", function (e) {
        closeNav.classList.replace("d-block", "d-none");
        openNav.classList.replace("d-none", "d-block");
        navbar.style.left = "-20%";
      });
    }
    openNav.addEventListener("click", openNavbar);
    function openNavbar() {
      openNav.classList.replace("d-block", "d-none");
      closeNav.classList.replace("d-none", "d-block");
      navbar.style.left = "0%";
    }
    closeNav.addEventListener("click", closeNavbar);
    function closeNavbar() {
      closeNav.classList.replace("d-block", "d-none");
      openNav.classList.replace("d-none", "d-block");
      navbar.style.left = "-20%";
    }
    // _______________________close & open navbar____________________________

    // ____________________________search page____________________________
    searchLink.addEventListener("click", getSearch);
    function getSearch() {
      searchInp.style.display = "flex";
      let test = [];
      searchData(test);
    }
    async function searchByName(name) {
      let myHttp = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
      );
      let myResp = await myHttp.json();
      let myData = myResp.meals;
      let matchedData = [];
      console.log(myData);
      for (let i = 0; i < myData.length; i++) {
        if (myData[i].strMeal.includes(name) === true) {
          matchedData.push(myData[i]);
        }
      }
      searchData(matchedData);
      
    }
    async function searchByFirst(name) {
      let myHttp = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`
      );
      let myResp = await myHttp.json();
      let myData = myResp.meals;
      let matchedData = [];
      console.log(myData);
      for (let i = 0; i < myData.length; i++) {
        if (myData[i].strMeal.includes(name) === true) {
          matchedData.push(myData[i]);
        }
      }
      searchData(matchedData);
    }
    function searchData(arr) {
      let temp = "";
      for (let i = 0; i < arr.length; i++) {
        temp += `<div mealId="${arr[i].idMeal}" class="col-md-3">
          <div class="content position-relative overflow-hidden rounded-3">
              <img src="${arr[i].strMealThumb}" alt="" class="w-100">
              <div class="mael-name position-absolute h-100 start-0 end-0 d-flex align-items-center">
                  <h2>${arr[i].strMeal}</h2>
              </div>
          </div>
      </div>`;
      }
      displayData.innerHTML = temp;
      let action = displayData.childNodes;
      for (let index = 0; index < action.length; index++) {
        action[index].addEventListener("click", function () {
          let id = action[index].getAttribute("mealId");
          console.log(id);
          getMealDesc(id);
        });
      }
    }

    // ____________________________searchByName(searchName.value)____________________________
    searchName.addEventListener("keyup", function () {
      searchByName(this.value);
    });
    searchFirst.addEventListener("keyup", function () {
      searchByFirst(this.value);
    });
    // ____________________________search page____________________________

    // ____________________________Categories page____________________________
    categoriesLink.addEventListener("click", getCategories);
    async function getCategories() {
      let myHttp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      let myResp = await myHttp.json();
      let categories = myResp.categories;
      // console.log(categories);
      displayCategories(categories);
      searchInp.style.display = "none";
      loginInput.style.display = "none";
    }
    function displayCategories(arr) {
      let temp = "";
      for (let i = 0; i < arr.length; i++) {
        temp += `<div categoryName="${arr[i].strCategory}" class="col-md-3">
        <div class="content position-relative overflow-hidden rounded-3">
            <img src="${arr[i].strCategoryThumb}" alt="" class="w-100">
            <div class="mael-name position-absolute h-100 start-0 end-0 text-center">
                <h2>${arr[i].strCategory}</h2>
                <p>${arr[i].strCategoryDescription}</p>
            </div>
        </div>
    </div>`;
      }
      displayData.innerHTML = temp;
      let action = displayData.childNodes;
      console.log(action);
      for (let index = 0; index < action.length; index++) {
        action[index].addEventListener("click", function () {
          let id = action[index].getAttribute("categoryName");
          console.log(id);
          getCategoryList(id);
        });
    }
    }
     // ____________________________Categorie List ____________________________
     async function getCategoryList(categoryKey) {
        let myHttp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryKey}`);
        let myResp = await myHttp.json();
        let myData = myResp.meals;
        displayCategoryList(myData)
    }

    function displayCategoryList(arr) {
        let temp = '';
        for (let i = 0; i < arr.length; i++) {
            temp+=`<div mealId="${arr[i].idMeal}" class="sh col-md-3">
            <div class="content position-relative overflow-hidden rounded-3">
                <img src="${arr[i].strMealThumb}" alt="" class="w-100">
                <div class="mael-name position-absolute h-100 start-0 end-0 d-flex align-items-center">
                    <h2>${arr[i].strMeal}</h2>
                </div>
            </div>
        </div>`
        }
        displayData.innerHTML = temp
        let action = displayData.childNodes;
      for (let index = 0; index < action.length; index++) {
        action[index].addEventListener("click", function () {
          let id = action[index].getAttribute("mealId");
          console.log(id);
          getMealDesc(id);
        });
      }
    }
    // ____________________________Categorie List description____________________________
    // ____________________________Categories page____________________________

    // ____________________________Area page____________________________
    areaLink.addEventListener("click", getArea);
    async function getArea() {
      let myHttp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
      );
      let myResp = await myHttp.json();
      let area = myResp.meals;
      // console.log(Area);
      displayArea(area);
      searchInp.style.display = "none";
      loginInput.style.display = "none";
    }
    function displayArea(arr) {
      let temp = "";
      for (let i = 0; i < arr.length; i++) {
        temp += `<div areaName="${arr[i].strArea}" class="col-md-3">
        <div class="content position-relative overflow-hidden rounded-3 text-center text-white">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h2>${arr[i].strArea}</h2>
            
        </div>
    </div>`;
      }
      displayData.innerHTML = temp;
      let action = displayData.childNodes;
      for (let index = 0; index < action.length; index++) {
        action[index].addEventListener('click',function(){
            let id = action[index].getAttribute('areaName');
            getAreaMealList(id)
        })
      }
    }
    // ____________________________Area meal List description____________________________
    async function getAreaMealList(areaKey) {
        let myHttp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaKey}`);
        let myResp = await myHttp.json();
        let myData = myResp.meals;
        displayAreaMealList(myData)
    }

    function displayAreaMealList(arr) {
        let temp = '';
        for (let i = 0; i < arr.length; i++) {
            temp+=`<div mealId="${arr[i].idMeal}" class="sh col-md-3">
            <div class="content position-relative overflow-hidden rounded-3">
                <img src="${arr[i].strMealThumb}" alt="" class="w-100">
                <div class="mael-name position-absolute h-100 start-0 end-0 d-flex align-items-center">
                    <h2>${arr[i].strMeal}</h2>
                </div>
            </div>
        </div>`
        }
        displayData.innerHTML = temp
        let action = displayData.childNodes;
      for (let index = 0; index < action.length; index++) {
        action[index].addEventListener("click", function () {
          let id = action[index].getAttribute("mealId");
          console.log(id);
          getMealDesc(id);
        });
      }
    }
    // ____________________________Area meal List description____________________________
    
    // ____________________________Area page____________________________

    // ____________________________Ingredients page____________________________
    ingredientsLink.addEventListener("click", getIngredients);
    async function getIngredients() {
      let myHttp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
      );
      let myResp = await myHttp.json();
      let ingredients = myResp.meals;
      // console.log(Ingredients);

      displayIngredients(ingredients);
      searchInp.style.display = "none";
      loginInput.style.display = "none";
    }
    function displayIngredients(arr) {
      let temp = "";
      for (let i = 0; i < 20; i++) {
        let desc = arr[i].strDescription;
        temp += `<div ingredientsName="${arr[i].strIngredient}" class="col-md-3">
        <div class="content position-relative overflow-hidden rounded-3 text-center text-white">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h2>${arr[i].strIngredient}</h2>
            <p>${desc.split(" ").slice(0, 20).join(" ")}</p>
        </div>
    </div>`;
      }
      displayData.innerHTML = temp;
      let action = displayData.childNodes;
      for (let index = 0; index < action.length; index++) {
        action[index].addEventListener('click',function(){
            let id = action[index].getAttribute('ingredientsName');
            getIngredientsMealList(id)
        })
      }
    }
     // ____________________________Ingredients meal List description____________________________
     async function getIngredientsMealList(ingredientsKey) {
        let myHttp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientsKey}`);
        let myResp = await myHttp.json();
        let myData = myResp.meals;
        displayIngredientsMealList(myData)
    }

    function displayIngredientsMealList(arr) {
        let temp = '';
        for (let i = 0; i < arr.length; i++) {
            temp+=`<div mealId="${arr[i].idMeal}" class="sh col-md-3">
            <div class="content position-relative overflow-hidden rounded-3">
                <img src="${arr[i].strMealThumb}" alt="" class="w-100">
                <div class="mael-name position-absolute h-100 start-0 end-0 d-flex align-items-center">
                    <h2>${arr[i].strMeal}</h2>
                </div>
            </div>
        </div>`
        }
        displayData.innerHTML = temp
        let action = displayData.childNodes;
      for (let index = 0; index < action.length; index++) {
        action[index].addEventListener("click", function () {
          let id = action[index].getAttribute("mealId");
          console.log(id);
          getMealDesc(id);
        });
      }
    }
    // ____________________________Ingredients meal List description____________________________

    // ____________________________Ingredients page____________________________

    // ____________________________login page____________________________
    contactLink.addEventListener("click", getContact);
    function getContact() {
      
        loginInput.style.display = "flex";
      searchInp.style.display = "none";
      displayData.innerHTML = ''
    }
    // valid input

    userNameInp.addEventListener('blur',validName)
    function validName() {
        let alertName = document.querySelector("#alertName");
        let ragex = /^[A-Za-z]{3,10}(\s?[A-Za-z]{3,10})?$/;
        if (ragex.test(userNameInp.value) == true) {
            userNameInp.classList.add("is-valid");
            userNameInp.classList.remove("is-invalid");
          alertName.classList.replace("d-block", "d-none");
          return true;
        } else {
            userNameInp.classList.add("is-invalid");
            userNameInp.classList.remove("is-valid");
          alertName.classList.replace("d-none", "d-block");
          return false;
        }
      }
    userEmailInp.addEventListener('blur',validEmail)
    function validEmail() {
        let alertEmail = document.querySelector("#alertEmail");
        let ragex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (ragex.test(userEmailInp.value) == true) {
            userEmailInp.classList.add("is-valid");
            userEmailInp.classList.remove("is-invalid");
            alertEmail.classList.replace("d-block", "d-none");
          return true;
        } else {
            userEmailInp.classList.add("is-invalid");
            userEmailInp.classList.remove("is-valid");
            alertEmail.classList.replace("d-none", "d-block");
          return false;
        }
      }
    userPhoneInp.addEventListener('blur',validPhone)
    function validPhone() {
        let alertPhone = document.querySelector("#alertPhone");
        let ragex = /^(011|012|015|010)[0-9]{8}$/;
        if (ragex.test(userPhoneInp.value) == true) {
            userPhoneInp.classList.add("is-valid");
            userPhoneInp.classList.remove("is-invalid");
            alertPhone.classList.replace("d-block", "d-none");
          return true;
        } else {
            userPhoneInp.classList.add("is-invalid");
            userPhoneInp.classList.remove("is-valid");
            alertPhone.classList.replace("d-none", "d-block");
          return false;
        }
      }
    userAgeInp.addEventListener('blur',validAge)
    function validAge() {
        let alertAge = document.querySelector("#alertAge");
        let ragex = /^[1-9]{2}$/;
        if (ragex.test(userAgeInp.value) == true) {
            userAgeInp.classList.add("is-valid");
            userAgeInp.classList.remove("is-invalid");
            alertAge.classList.replace("d-block", "d-none");
          return true;
        } else {
            userAgeInp.classList.add("is-invalid");
            userAgeInp.classList.remove("is-valid");
            alertAge.classList.replace("d-none", "d-block");
          return false;
        }
      }
    userPassInp.addEventListener('blur',validPass)
    function validPass() {
        let alertPass = document.querySelector("#alertPass");
        let ragex = /^.{8,20}$/;
        if (ragex.test(userPassInp.value) == true) {
            userPassInp.classList.add("is-valid");
            userPassInp.classList.remove("is-invalid");
            alertPass.classList.replace("d-block", "d-none");
          return true;
        } else {
            userPassInp.classList.add("is-invalid");
            userPassInp.classList.remove("is-valid");
            alertPass.classList.replace("d-none", "d-block");
          return false;
        }
      }
    userRepassInp.addEventListener('blur',validRepass)
    function validRepass() {
        let alertRepass = document.querySelector("#alertRepass");
        if (userRepassInp.value == userPassInp.value) {
            userRepassInp.classList.add("is-valid");
            userRepassInp.classList.remove("is-invalid");
            alertRepass.classList.replace("d-block", "d-none");
          return true;
        } else {
            userRepassInp.classList.add("is-invalid");
            userRepassInp.classList.remove("is-valid");
            alertRepass.classList.replace("d-none", "d-block");
          return false;
        }
      }
      loginInput.addEventListener('change',function(){
        if (isvalid()==true) {
            SubmitBtn.classList.remove('disabled')
        }else{
            SubmitBtn.classList.add('disabled')
        }
      })
    function isvalid() {
        validName();
        validEmail();
        validPhone();
        validAge();
        validPass();
        validRepass();
        if (validName() == true && validEmail() == true &&validPhone() == true && validAge() == true && validPass() == true && validRepass() == true) {
            
            return true
        }else{
            
            return false
        }
    }
    SubmitBtn.addEventListener('click',function(){
        let userList = []
        let userInfo = {
            userName:userNameInp.value,
            userEmail:userEmailInp.value,
            userPhone:userPhoneInp.value,
            userAge:userAgeInp.value,
            userPass:userPassInp.value,
        }
        userList.push(userInfo)
        localStorage.setItem('list',JSON.stringify(userList));
        clearForm()
    })
    function clearForm() {
        userNameInp.value = ""
        userEmailInp.value = ""
        userPhoneInp.value = ""
        userAgeInp.value = ""
        userPassInp.value = ""
        userRepassInp.value = ""
    }
      // valid input
    // ____________________________login page____________________________

    // ____________________________meals description____________________________
    async function getMealDesc(key) {
      let myHttp = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${key}`
      );
      let myResp = await myHttp.json();
      let myData = myResp.meals;
      displayMealDesc(myData);
      searchInp.style.display = "none";
    }
    function displayMealDesc(arr) {
      let temp = "";
      for (let i = 0; i < arr.length; i++) {
        let tag = arr[i].strTags;
        temp += `<div class="meal-card d-flex py-5 text-white">
        <div class="card-col-1">
          <img src="${arr[i].strMealThumb}" alt="" class="w-100 rounded-3">
          <h2>${arr[i].strMeal}</h2>
        </div>
        <div class="card-col-2 px-3">
          <h3>Instructions</h3>
          <p>${arr[i].strInstructions}</p>
          <h3>Area : <span class="fw-medium">${arr[i].strArea}</span></h3>
          <h3>Category : <span class="fw-medium">${
            arr[i].strCategory
          }</span></h3>
          <div class="recipes">
          <h3>Recipes :</h3>
          <div class="recipes-list d-flex flex-wrap">
            <p class="bg-info-subtle text-info-emphasis p-1 rounded-2 me-2">${
              arr[i].strMeasure1
            }</p>
            <p class="bg-info-subtle text-info-emphasis p-1 rounded-2 me-2">${
              arr[i].strMeasure2
            }</p>
            <p class="bg-info-subtle text-info-emphasis p-1 rounded-2 me-2">${
              arr[i].strMeasure3
            }</p>
            <p class="bg-info-subtle text-info-emphasis p-1 rounded-2 me-2">${
              arr[i].strMeasure4
            }</p>
            <p class="bg-info-subtle text-info-emphasis p-1 rounded-2 me-2">${
              arr[i].strMeasure5
            }</p>
            <p class="bg-info-subtle text-info-emphasis p-1 rounded-2 me-2">${
              arr[i].strMeasure6
            }</p>
            <p class="bg-info-subtle text-info-emphasis p-1 rounded-2 me-2">${
              arr[i].strMeasure7
            }</p>
            <p class="bg-info-subtle text-info-emphasis p-1 rounded-2 me-2">${
              arr[i].strMeasure8
            }</p>
            <p class="bg-info-subtle text-info-emphasis p-1 rounded-2 me-2">${
              arr[i].strMeasure9
            }</p>
            </div>
            </div>
            <div class="tags">
          <h3>Tags :</h3>
          <div class="d-flex flex-wrap">
            <p class="bg-danger-subtle text-danger-emphasis p-1 rounded-2 me-2">${
              tag == null ? (tag = "no") : tag
            }</p>
          </div>
          </div>
          <div class="btn-container">
            <a href="${
              arr[i].strInstructions
            }" class="btn btn-success" target="_blank">Source</a>
            <a href="${
              arr[i].strYoutube
            }" class="btn btn-danger" target="_blank">Youtube</a>
          </div>
        </div>
      </div>`;
      }
      displayData.innerHTML = temp;
    }
    // ____________________________meals description____________________________
   
   
  }
});
