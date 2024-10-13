import { useEffect, useRef, useState, useCallback } from 'react';


export function useIsAuth() {
    if(window.localStorage.getItem('token')) {
        return true;
    } else {
        return false;
    }
}
export function useObserverRef(cb:() => void, options:any = {
    root: null,
    rootMargin: "0px",
    threshold: 1
}) {
    const observer = useRef<any>(null)
    return useCallback((node:any) => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                cb()
            }
        }, options)
        if (node) observer.current.observe(node)
    }, [cb, options])
}

export function useClickOutside(ref:any, callback:any) {
    const handleClick = (e:any) => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    });
}

export function useDebounce<T>(delay:number, cb:() => void, dependency:T) {
    const timeoutRef = useRef<any>(null)
    useEffect(() => {
        if(timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        const handler = setTimeout(() => {
            cb()
        }, delay)
        return () => {
            clearTimeout(handler)
        }
    }, [dependency])
}