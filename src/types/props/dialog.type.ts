export type DialogContentProps<T, U> = {
    data: T,
    onClose: (_?: U) => void
}

export type DialogMethod<T> = {
    open: (_: T) => void
}