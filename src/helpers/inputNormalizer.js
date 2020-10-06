export const BOOL_TYPE = 'bool';
export const INT_TYPE = 'int';
export const FLOAT_TYPE = 'float';

export const inputNormalizer = ({ dataset, name, value }) => {
    if (dataset && dataset.scalar) {
        // We are casting string to value
        switch (dataset.scalar) {
            case BOOL_TYPE:
                value = value === 'true';
                break;
            case INT_TYPE:
                value = parseInt(value);
                break;
            case FLOAT_TYPE:
                value = parseFloat(value);
                break;
            default:
                throw new Error('Invalid Input type')
        }
    }

    return { [name]: value };
}