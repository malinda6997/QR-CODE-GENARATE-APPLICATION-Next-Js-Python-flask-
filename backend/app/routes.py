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

        qr = qrcode.make(data)
        buffer = io.BytesIO()
        qr.save(buffer, format="PNG")
        buffer.seek(0)

        return send_file(buffer, mimetype="image/png")

    except Exception as e:
        return jsonify({"error": str(e)}), 500
# complete the backend
