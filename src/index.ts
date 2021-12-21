import { DEFAULT_OPTIONS } from './constants';
export default class DiningSelector {
    private _options: string[];

    constructor() {
        this._options = DEFAULT_OPTIONS;
    }

    /** Current options for display to users. */
    get options(): string[] {
        return this._options;
    }

    /**
     * Adds an option to the array.
     *
     * Throws if the option is already present so you may display the message to the user.
     * @param option option to add
     */
    addOption(option: string): void {
        if (option.length < 3) {
            throw new Error('Option must be greater than 3 characters');
        }

        const foundOption = this._options.find((x) => x.trim().toUpperCase() === option.trim().toUpperCase());
        if (foundOption) {
            throw new Error('Option exists');
        }

        const capitalizedOption = option.charAt(0).toUpperCase() + option.slice(1);

        const newOptions = [...this._options, capitalizedOption.trim()].sort();
        this._options = newOptions;
    }

    /**
     * Removes an option from the array.
     *
     * Throws if the option is not present so you may display the message to the user.
     *
     * Throws if the option is the last option.
     * @param option option to remove
     */
    deleteOption(option: string): void {
        if (this._options.length === 1) {
            throw new Error('last item cannot be deleted');
        }

        const foundIndex = this._options.findIndex((x) => x.trim().toUpperCase() === option.trim().toUpperCase());
        if (foundIndex === -1) {
            throw new Error('Option not found');
        }

        const newOptions = this._options.filter((x) => x.trim().toUpperCase() !== option.trim().toUpperCase());
        this._options = newOptions;
    }

    /**
     * Resets the options to the default array.
     */
    resetOptions(): void {
        this._options = DEFAULT_OPTIONS;
    }

    /**
     * Selects an option via random number generation and returns it.
     * @returns string option
     */
    selectOption(): string {
        // No need to add one as the last index is excluded.
        const selectedIndex = Math.floor(Math.random() * this._options.length);
        return this._options[selectedIndex];
    }
}
