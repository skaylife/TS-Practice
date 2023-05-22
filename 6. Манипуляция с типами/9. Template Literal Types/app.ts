type ReadOrWrite = 'read' | 'write'
type Bulk = 'bulk' | ''

// Получились union type 
type Access = `can${Capitalize<ReadOrWrite>}${Capitalize<Bulk>}`
// Infer вытаскивает для следующего использования
type ReadOrWriteBulk<T> = T extends `can${infer R}` ? R : never;

type T = ReadOrWriteBulk<Access>

type ErrorOrSuccess = 'error' | 'success';

type ResponseT = {
    result: `http${Capitalize<ErrorOrSuccess>}`
}

const a2: ResponseT = {
    result: 'httpSuccess'
}