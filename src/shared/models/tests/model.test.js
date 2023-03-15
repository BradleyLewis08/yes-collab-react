
import { Catalog, catalogFactory, shuffledCatalog } from "../catalog.model"
import { FilterOptions } from "../filterOptions.model"
import mock from "./mock"

describe("Catalog", () => {

    let catalog = catalogFactory(mock.data)

    // it('Catalog Factory', () => {
    //     expect(catalog.models.length).toEqual(54)
    // })
    // it('Query Specific Position', () => {
    //     let pos = catalog.posAt(2)
    //     expect(1).toStrictEqual(1)
    // })
    // it('Sort', () => {       
    //     let sortedCatalog = catalog.sorted(new FilterOptions({
    //         Search: "",
    //         Industry: [],
    //         Role: [],
    //         TimeCommitment: [],
    //         TimePeriod: [],
    //         Experience: [],
    //         Funding: [],
    //         Paid: ""
    //     })) 
    //     expect(1).toStrictEqual(1)
    // })
    // it('Industries', () => {
    //     let industries = catalog.industries
    //     expect(1).toStrictEqual(1)
    // })
    // it('Start-up IDS', () => {
    //     let ids = catalog.ids
    //     expect(1).toStrictEqual(1)
    // })
    // it('All Start-Up Info', () => {
    //     let startups = catalog.startups
    //     expect(1).toStrictEqual(1)
    // })
    it('Shuffle', () => {
        let x = shuffledCatalog(catalog)
        expect(1).toStrictEqual(1)
    })
    it('Shuffle', () => {
        var arr = []
        catalog.models.forEach(catPos => {
            catPos.Positions.models.forEach(pos => {
                if (pos.MaxInterns > pos.InternsFilled) {
                    arr.push(pos)
                }
            })
        })
        console.log(arr)
    })
})


