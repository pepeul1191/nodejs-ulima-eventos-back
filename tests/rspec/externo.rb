# encoding: utf-8
require_relative 'app'
require 'json'

def crear
  RSpec.describe App do
    describe '1. Crear externo: ' do
      it '1.1 Conexión con backend' do
        url = 'test/conexion'
        test = App.new(url)
        test.get()
        expect(test.response.code).to eq(200)
      end
      it '1.2 Crear externo' do
        data = {
          :dni => '70232383',
          :nombres => 'Carlos Alberto',
          :paterno => 'Tevez',
          :materno => 'Martinez',
          :correo => 'carlitos@cabj.ar',
          :telefono => '819234-12312',
        }.to_json
        url = 'externo/crear?externo=' + data
        test = App.new(url)
        test.post()
        if test.response.code != 200 then
          puts test.response.body
        end
        expect(test.response.code).to eq(200)
        expect(test.response.body).not_to include('error')
        expect(test.response.body).to include('Se ha registrado al participante externo')
        expect(test.response.body).to include('success')
      end
    end
  end
end

crear
