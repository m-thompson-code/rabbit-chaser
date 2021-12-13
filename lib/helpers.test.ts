import { indexIsOutOfBound } from "./helpers";

describe("helpers", () => {
    describe("indexIsOutOfBound()", () => {
        it('should return false if index is less than limit', () => {
            const limit = 5;
            const index = 3;
            expect(index).toBeLessThan(limit);
            expect(indexIsOutOfBound(limit, index)).toBe(false);
        });

        it('should return true if index equal to limit', () => {
            const limit = 5;
            const index = 5;
            expect(index).toBe(limit);
            expect(indexIsOutOfBound(limit, index)).toBe(true);
        });

        it('should return true if index greater than limit', () => {
            const limit = 5;
            const index = 10;
            expect(index).toBeGreaterThan(limit);
            expect(indexIsOutOfBound(limit, index)).toBe(true);
        });

        it('should return true index is less than 0', () => {
            const limit = 5;
            const index = -1;
            expect(index).toBeLessThan(0);
            expect(indexIsOutOfBound(limit, index)).toBe(true);
        });
    });
});
