/// <reference types="cypress" />
import Category from "../PageObjects/2Category"

describe('Catergory Module CRUD Test', () => {
let categoryData;
const cat = new Category();

    before(() => {
        cy.fixture('categoryData.json').then((data) => {
          categoryData = data;
        })
    })

    beforeEach(() => {
        cy.login('admin', '123456')
    })

    it('Test to CREATE Category', () => {

        cat.clickCategoryMenu(categoryData.txtCategory)
        cat.clickAddCategoryButton()
        cat.verifyCategoryTitle(categoryData.txtAddCategoryTitle)
        cat.clickSubmit(categoryData.txtSubmit)
        cat.checkValidation(categoryData.titleJP, categoryData.titleEN, categoryData.descriptionJP, categoryData.descriptionEN, categoryData.priority)
        cat.clickCancel(categoryData.txtCancel)
        cat.clickAddCategoryButton()
        cat.fillInputFields(categoryData.inputTitleJP, categoryData.inputTitleEN, categoryData.inputDescriptionJP, categoryData.inputDescriptionEN,categoryData.txtShowInMenuNo,categoryData.txtSelectStatusNo, categoryData.priorityValue)

    })

    it('Test to EDIT Category', () => {

        cat.clickCategoryMenu(categoryData.txtCategory)
        cat.clickEditCategoryMenu(categoryData.inputTitleJP)
        cat.verifyEditCategoryTitle(categoryData.txtEditCategoryTitle)
        cat.updateInputFields(categoryData.upinputTitleJP, categoryData.upinputTitleEN, categoryData.upinputDescriptionJP, categoryData.upinputDescriptionEN, categoryData.txtShowInMenuYes, categoryData.txtSelectStatusYes, categoryData.uppriorityValue )
        cat.checkUpdatedCategoryMenu(categoryData.upinputTitleJP)
        })


    it('Test to DELETE Category', () => {

        cat.clickCategoryMenu(categoryData.txtCategory)
        cat.deleteCategoryMenu(categoryData.upinputTitleJP)
        cat.deleteCancelCategoryMenu()
        cat.deleteCategoryMenu(categoryData.upinputTitleJP)
        cy.wait(2000)
        cat.confirmDeleteCategoryMenu(categoryData.txtSuccess)

    })
})

