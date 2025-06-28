from flask import Blueprint, request, jsonify, send_file
import qrcode
import io

main = Blueprint("main", __name__)

@main.route("/", methods=["GET"])
def home():
    return "<h1>QR Code Generator Backend is running</h1>"

@main.route("/generate", methods=["POST"])
def generate_qr():
    try:
        data = request.json.get("text")
        if not data:
            return jsonify({"error": "No text provided"}), 400

        # Create QR code with better error correction
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(data)
        qr.make(fit=True)

        # Create QR code image
        img = qr.make_image(fill_color="black", back_color="white")
        
        # Save to buffer
        buffer = io.BytesIO()
        img.save(buffer, format="PNG")
        buffer.seek(0)

        return send_file(buffer, mimetype="image/png", as_attachment=False)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
