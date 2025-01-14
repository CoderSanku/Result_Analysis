import pandas as pd

# Load the converted Excel file
pdf_path = r"E:\Projects\Intership\Project\pdf-to-excel-converter-backend-master\outputs\result.xlsx"
df = pd.read_excel(pdf_path)

# Define a function to parse a cell with multiple values
def parse_cell(cell):
    if isinstance(cell, str):
        values = cell.split(' ')  # Adjust delimiter based on your data
        return {
            'theory': values[0] if len(values) > 0 else None,
            'practical': values[1] if len(values) > 1 else None,
            'grade': values[2] if len(values) > 2 else None
        }
    return {'theory': None, 'practical': None, 'grade': None}

# Apply parsing to the target column
parsed_data = df['Marks Column'].apply(parse_cell)

# Convert parsed data back to a DataFrame
cleaned_df = pd.DataFrame(parsed_data.tolist())

# Save cleaned data to a new Excel file
cleaned_df.to_excel("cleaned_file.xlsx", index=False)
print("Data cleaned and saved to cleaned_file.xlsx.")
