import Database from 'better-sqlite3'
import { randomString } from './util'

export const db = new Database('./database/sqlite.db', {})

db.pragma('journal_mode = WAL')

export function createTable() {
	// Enable Write-Ahead Logging for better concurrency and performance
	db.pragma('journal_mode = WAL')
	// Increase cache size to approximately 100MB (-25000 pages, where each page is 4KB)
	db.pragma('cache_size = -25000')
	// Set synchronous mode to NORMAL for a balance between safety and performance
	// Set synchronous mode to FULL for maximum durability at the cost of performance
	db.pragma('synchronous = NORMAL')
	// Store temporary tables and indices in memory instead of on disk
	db.pragma('temp_store = MEMORY')
	// Set the maximum size of the memory-mapped I/O to approximately 1GB
	db.pragma('mmap_size = 1000000000')
	// Enable foreign key constraints for data integrity
	db.pragma('foreign_keys = true')
	// Set a busy timeout of 5 seconds to wait if the database is locked
	db.pragma('busy_timeout = 5000')
	// Enable incremental vacuuming to reclaim unused space and keep the database file size optimized
	db.pragma('auto_vacuum = INCREMENTAL')

	db.exec(`
        CREATE TABLE IF NOT EXISTS 'comments' (
            'id' integer PRIMARY KEY NOT NULL,
            'author' text NOT NULL,
            'content' text NOT NULL
        );`)
}

export async function dbTest() {
	const statement = `INSERT INTO 'comments' (author, content) values ( '${randomString()}', '${randomString()}' ) `

	const TEST_TIME_MS = 5_000
	const startTime = Date.now()

	let newRecords = 0

	await new Promise((res) => setTimeout(res, 100))

	while (Date.now() < startTime + TEST_TIME_MS) {
		new Promise<void>((res) => {
			db.exec(statement)
			newRecords += 1
			return res()
		})
	}

	const rps = Math.floor(newRecords / (TEST_TIME_MS / 1000))

	console.log(`Created ${newRecords} records that is ${rps}/s`)

	return { newRecords, rps }
}
