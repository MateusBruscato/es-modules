import mocha from 'mocha';
import chai from 'chai';
import Person from '../src/person.js';
const { describe, it } = mocha;
const { expect } = chai;

describe("Person", () => {
    it('should return a person instance from a string', () => {
        const person = Person.generateInstanceFromString("1 Bike,Aviao 2000000 2020-01-01 2020-02-01");
        const expected = {
            from: "2020-01-01",
            to: "2020-02-01",
            kmTraveled: "2000000",
            vehicles: ["Bike", "Aviao"],
            id: "1",
        };
        expect(person).to.be.deep.equal(expected);
    });

    it('should format values', () => {
        const person = new Person({
            from: "2020-01-01",
            to: "2020-02-01",
            kmTraveled: "2000000",
            vehicles: ["Bike", "Aviao"],
            id: "1",
        });
        const result = person.formatted("pt-BR");

        const expected = {
            from: "01 de janeiro de 2020",
            to: "01 de fevereiro de 2020",
            kmTraveled: "2.000.000 km",
            vehicles: "Bike e Aviao",
            id: 1,
        };

        expect(result).to.be.deep.equal(expected);
    })
})