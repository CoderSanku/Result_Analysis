from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import camelot
import pandas as pd
import os
import uuid

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
OUTPUT_FOLDER = 'outputs'

# Create directories if they don't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

def process_pdf_to_excel(pdf_path, output_filename):
    try:
        # Attempt to extract tables using 'lattice'
        tables = camelot.read_pdf(pdf_path, pages="all", flavor="lattice")
        if tables and len(tables) > 0:
            save_tables_to_excel(tables, output_filename)
            return output_filename
        
        # If 'lattice' fails, fallback to 'stream'
        tables = camelot.read_pdf(pdf_path, pages="all", flavor="stream")
        if tables and len(tables) > 0:
            save_tables_to_excel(tables, output_filename)
            return output_filename

        # If no tables are found in either mode, return None
        return None
    except Exception as e:
        print(f"Error processing PDF: {e}")
        return None

def save_tables_to_excel(tables, output_filename):
    # Save tables to an Excel file with multiple sheets
    with pd.ExcelWriter(output_filename, engine='openpyxl') as writer:
        for i, table in enumerate(tables):
            df = table.df  # Extract the table as a DataFrame
            
            # Apply splitting logic for all cells in the DataFrame
            df = split_data_in_cells(df)
            
            # Save the cleaned DataFrame to a new sheet
            df.to_excel(writer, sheet_name=f'Sheet{i+1}', index=False)

def split_data_in_cells(df):
    # Loop through each cell in the DataFrame
    for col in df.columns:
        # Apply splitting logic if the cell contains multiple values
        df[col] = df[col].apply(lambda x: split_cell(x) if isinstance(x, str) else x)
    return df

def split_cell(cell):
    # Split cell content by spaces and join as separate values
    parts = cell.split()  # Split by spaces
    if len(parts) > 1:
        # Example: If "42 -- 21E" → ["42", "--", "21E"], make it consistent
        return "|".join(parts)  # Use a delimiter like '|' for clarity
    return cell

@app.route('/upload-pdf', methods=['POST'])
def upload_pdf():
    if 'pdf' not in request.files:
        return jsonify({'message': 'No file part in the request'}), 400

    file = request.files['pdf']
    if file.filename == '':
        return jsonify({'message': 'No file selected for uploading'}), 400

    if file and file.filename.endswith('.pdf'):
        pdf_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(pdf_path)

        output_filename = os.path.join(OUTPUT_FOLDER, f"{uuid.uuid4()}.xlsx")
        processed_file = process_pdf_to_excel(pdf_path, output_filename)

        if processed_file:
            return send_file(processed_file, as_attachment=True)
        else:
            return jsonify({'message': 'Failed to process the PDF. No tables found or processing error.'}), 500

    return jsonify({'message': 'Invalid file type. Please upload a PDF.'}), 400

if __name__ == '__main__':
    app.run(port=3000, debug=True)
