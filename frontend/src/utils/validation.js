'use strict';

/**
 * Validates if the input is a valid email address.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns true if valid, otherwise false.
 */
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

/**
 * Validates if the input is a valid phone number.
 * @param {string} phone - The phone number to validate.
 * @returns {boolean} - Returns true if valid, otherwise false.
 */
function isValidPhoneNumber(phone) {
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(phone);
}

/**
 * Validates if the input is a valid date in YYYY-MM-DD format.
 * @param {string} date - The date to validate.
 * @returns {boolean} - Returns true if valid, otherwise false.
 */
function isValidDate(date) {
    const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/;
    return datePattern.test(date);
}

// Exporting the helper functions for use in other modules.
module.exports = {
    isValidEmail,
    isValidPhoneNumber,
    isValidDate
};
