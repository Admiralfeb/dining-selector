import { DEFAULT_OPTIONS } from '../src/constants';
import DiningSelector from '../src/index';

describe('Dining Selector', () => {
    let instance: DiningSelector;
    beforeEach(() => {
        instance = new DiningSelector();
    });
    it('should return default options initially', () => {
        expect(instance.options).toEqual(DEFAULT_OPTIONS.sort());
    });

    it("should add an item if it doesn't exist", () => {
        instance.addOption('ABC Place to Eat');

        expect(instance.options).toEqual(['ABC Place to Eat', ...DEFAULT_OPTIONS.sort()]);
    });

    it('should error on add if the item already exists', () => {
        expect(() => instance.addOption('McDonalds')).toThrowError('Option exists');
    });

    it('should delete an item if it exists', () => {
        instance.deleteOption('mcdonalds');

        expect(instance.options).toEqual(['Firehouse Subs', 'Noodles and Company', 'Qdoba', 'Taco Shop'].sort());
    });

    it('should error on delete if the item does not exist', () => {
        expect(() => instance.deleteOption('Not Real Restaurant')).toThrowError('Option not found');
    });

    it('should error on delete if the item is the last item in the list', () => {
        instance.deleteOption('firehouse subs');
        instance.deleteOption('mcdonalds');
        instance.deleteOption('noodles and company');
        instance.deleteOption('Qdoba');

        expect(() => instance.deleteOption('taco shop')).toThrowError('last item cannot be deleted');
    });

    it('should select an item within the list', () => {
        for (let index = 0; index < 20; index++) {
            const selected = instance.selectOption();
            expect(instance.options).toContain(selected);
        }
    });

    it('should return to default when reset is called', () => {
        instance.deleteOption('mcdonalds');
        instance.addOption('babyfood');

        instance.resetOptions();

        expect(instance.options).toEqual(DEFAULT_OPTIONS.sort());
    });
});
