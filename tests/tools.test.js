import { expect, test } from "vitest"
import { beadsCol, randomNumber } from "../src/tools/helpers"

test("generate random number between 1 and 10", () => {
  const number = randomNumber(1, 10)
  expect(number).toBeTypeOf("number")
  expect(number).toBeGreaterThanOrEqual(1)
  expect(number).toBeLessThanOrEqual(10)
})

test("generate random number between -100 and -50 (include zero)", () => {
  const number = randomNumber(-100, -50, true)
  expect(number).toBeGreaterThanOrEqual(-100)
  expect(number).toBeLessThanOrEqual(-50)
})

test("generate random number between 100 and 200 (include zero)", () => {
  const number = randomNumber(100, 200, true)
  expect(number).toBeGreaterThanOrEqual(100)
  expect(number).toBeLessThanOrEqual(200)
})

test("generate random number between 1000 and 1002 (include zero)", () => {
  const number = randomNumber(1000, 1002, true)
  expect(number).toBeGreaterThanOrEqual(1000)
  expect(number).toBeLessThanOrEqual(1002)
})

test("generate random number between 1 and -50 (include zero)", () => {
  const number = randomNumber(1, -50, true)
  expect(number).toBeGreaterThanOrEqual(-50)
  expect(number).toBeLessThanOrEqual(1)
})

test("generate random number between -1 and 1 (include zero)", () => {
  const number = randomNumber(-1, 1, true)
  expect(number).toBeGreaterThanOrEqual(-1)
  expect(number).toBeLessThanOrEqual(1)
})

test("generate random number between -1 and 1 (exclude zero)", () => {
  const number = randomNumber(-1, 1, false)
  expect(number).toBeGreaterThanOrEqual(-1)
  expect(number).toBeLessThanOrEqual(1)
  expect(number).not.toBe(0)
})

test("beads show 0", () => {
  const beads = beadsCol(0)
  expect(beads).toEqual([false, true, true, true, true])
})

test("beads show 1", () => {
  const beads = beadsCol(1)
  expect(beads).toEqual([false, false, true, true, true])
})

test("beads show 7", () => {
  const beads = beadsCol(7)
  expect(beads).toEqual([true, false, false, true, true])
})

test("beads show 4", () => {
  const beads = beadsCol(4)
  expect(beads).toEqual([false, false, false, false, false])
})
