terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "bucket_aula" {
  bucket = "bucket-challenge-musica-01"

  tags = {
    Name = "terraform-s3-aula"
  }
}

# 2. Configuración del sitio web estático
resource "aws_s3_bucket_website_configuration" "sitio_web" {
  bucket = aws_s3_bucket.bucket_aula.id

  index_document {
    suffix = "index.html"
  }
}

# 3. Desactivar los bloqueos de acceso público
resource "aws_s3_bucket_public_access_block" "acceso_publico" {
  bucket = aws_s3_bucket.bucket_aula.id

  block_public_acls       = false
  ignore_public_acls      = false
  block_public_policy     = false
  restrict_public_buckets = false
}

# 4. Política del bucket para permitir lectura pública a cualquier usuario
resource "aws_s3_bucket_policy" "politica_lectura_publica" {
  bucket = aws_s3_bucket.bucket_aula.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.bucket_aula.arn}/*"
      }
    ]
  })

  # Esto asegura que Terraform quite el bloqueo ANTES de aplicar la política pública
  depends_on = [aws_s3_bucket_public_access_block.acceso_publico]
}