package tables

import (
	"database/sql"

	"github.com/pkg/errors"
)

func init() {
	MigrationClient.AddMigration(Up_20171219164727, Down_20171219164727)
}

func Up_20171219164727(tx *sql.Tx) error {
	// Add query name column
	query := `
		ALTER TABLE scheduled_queries
		ADD COLUMN query_name varchar(255)
	`
	if _, err := tx.Exec(query); err != nil {
		return errors.Wrap(err, "adding query_name column")
	}

	// Populate query name column via join with query ID
	query = `
		UPDATE scheduled_queries
		SET query_name = (SELECT name from queries where id = query_id)
	`
	if _, err := tx.Exec(query); err != nil {
		return errors.Wrap(err, "populating query_name column")
	}

	// Add not null constraint
	query = `
		ALTER TABLE scheduled_queries
		MODIFY query_name varchar(255) NOT NULL
	`
	if _, err := tx.Exec(query); err != nil {
		return errors.Wrap(err, "adding not null")
	}

	// Add foreign key constraint
	query = `
		ALTER TABLE scheduled_queries
		ADD FOREIGN KEY (query_name) REFERENCES queries (name)
	`
	if _, err := tx.Exec(query); err != nil {
		return errors.Wrap(err, "adding foreign key to query_name column")
	}

	// Add `name` column to scheduled_queries

	query = `
ALTER TABLE scheduled_queries
ADD COLUMN name varchar(255),
ADD COLUMN description varchar(255)
`
	if _, err := tx.Exec(query); err != nil {
		return errors.Wrap(err, "adding name to scheduled_queries")
	}

	query = `
ALTER TABLE packs
DROP COLUMN created_by
`
	if _, err := tx.Exec(query); err != nil {
		return errors.Wrap(err, "removing created_by from packs")
	}

	return nil
}

func Down_20171219164727(tx *sql.Tx) error {
	return nil
}
