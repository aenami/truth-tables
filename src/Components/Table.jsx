import React from "react";
import "../styles/heroSection.css";

function Table({ data }) {
	if (!data || data.length === 0) return null;

	// Todas las columnas (variables + subexpresiones + result)
	const columns = Object.keys(data[0]);

	return (
		<div className="resultTable">
			<table>
				<thead>
					<tr>
						{columns.map((col) => (
							<th key={col}>{col}</th>
						))}
					</tr>
				</thead>

				<tbody>
					{data.map((row, rowIndex) => (
						<tr key={rowIndex}>
							{columns.map((col) => (
								<td key={col}>
									{typeof row[col] === "boolean"
										? row[col] ? "V" : "F"
										: row[col]}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Table;
