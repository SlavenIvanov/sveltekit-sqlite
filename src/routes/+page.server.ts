import { dbTest, createTable } from '$lib/db'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({}) => {
	createTable()
	return {
		dbTest: dbTest()
	}
}
