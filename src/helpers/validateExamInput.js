export const validateExamInput = ({ name, code, timeout }) => {
    let err = [];

    if (!name.trim()) {
        err.push('Exam name cannot be empty')
    }

    if (!code.trim()) {
        err.push('Code cannot be empty')
    }

    if (timeout <= 0) {
        err.push('Timeout must be greater then 0')
    }

    return err;
}