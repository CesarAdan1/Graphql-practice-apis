import React from 'react'
import './pagination.css'

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const pageNumbers = []
        for(let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i)
        }
        return pageNumbers
    }
    
    const pages = getPageNumbers()

    return (
        <div className='pagination'>
            {currentPage > 1 && (
                <button onClick={() => onPageChange(currentPage - 1)}>{'<'}</button>
            )}
            {pages.map(page => (
                <button
                    key={page}
                    className={page === currentPage ? 'active' : ''}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
            {currentPage < totalPages && (
                <button onClick={() => onPageChange(currentPage + 1)}>{'>'}</button>
            )}
        </div>
    )
}