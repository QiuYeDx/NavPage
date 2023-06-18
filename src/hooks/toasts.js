import React from 'react';
import toast from 'react-hot-toast';

export const notify_error = (str, id) => toast.error(
    (t) => (
        <span tw={"align-bottom animate-fade_in.8"}>
            <b>{str}</b>
        </span>
    ),
    {
        id: id || 'bookmark_error',
        duration: 4000,
        position: 'bottom-right',
        // position: 'top-center',

        // Styling
        style: {
            // position: 'relative',
            // top: '60px'
        },
        className: '',

        // Change colors of success/error/loading icon
        iconTheme: {
            primary: '#ed5563',
            secondary: '#fff',
        },

        // Aria
        ariaProps: {
            role: 'status',
            'aria-live': 'polite',
        },
    });

export const notify_success = (str, id) => toast.success(
    (t) => (
        <span tw={"align-bottom animate-fade_in.8"}>
            <b>{str}</b>
        </span>
    ),
    {
        id: id || 'bookmark_success',
        duration: 4000,
        position: 'bottom-right',
        // position: 'top-center',

        // Styling
        style: {
            // position: 'relative',
            // top: '60px'
        },
        className: '',

        // Change colors of success/error/loading icon
        iconTheme: {
            primary: 'rgb(52, 211, 153)',
            secondary: '#fff',
        },

        // Aria
        ariaProps: {
            role: 'status',
            'aria-live': 'polite',
        },
    });

export const notify_loading = (str, id) => toast.loading(
    (t) => (
        <span tw={"align-bottom animate-fade_in.8"}>
            <b>{str}</b>
        </span>
    ),
    {
        id: id || 'bookmark_loading',
        duration: 4000,
        position: 'bottom-right',
        // position: 'top-center',

        // Styling
        style: {
            // position: 'relative',
            // top: '60px'
        },
        className: '',

        // Change colors of success/error/loading icon
        iconTheme: {
            primary: 'rgb(96, 165, 250)',
            secondary: '#fff',
        },

        // Aria
        ariaProps: {
            role: 'status',
            'aria-live': 'polite',
        },
    });