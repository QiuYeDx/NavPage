export const ErrorCode = {
    DATABASE_ERROR: '1001',
    INVALID_INPUT: '1002',
    NETWORK_ERROR: '1003',
    PERMISSION_DENIED: '1004',
    NONE_RESULT_ERROR: '1005'
};

export function processErrorCode(code, error = null) {
    switch (code) {
        case ErrorCode.DATABASE_ERROR:
            console.log('Database Error:', error ? error.message : '');
            // Handle database error
            break;
        case ErrorCode.INVALID_INPUT:
            console.log('Invalid Input:', error ? error.message : '');
            // Handle invalid input error
            break;
        case ErrorCode.NETWORK_ERROR:
            console.log('Network Error:', error ? error.message : '');
            // Handle network error
            break;
        case ErrorCode.PERMISSION_DENIED:
            console.log('Permission Denied:', error ? error.message : '');
            // Handle permission denied error
            break;
        case ErrorCode.NONE_RESULT_ERROR:
            console.log('None Result:', error ? error.message : '');
            // Handle none result error
            break;
        default:
            console.log('Unknown Error:', error ? error.message : '');
        // Handle other types of errors
    }
}
