# encoding: utf-8
require_relative 'app'
require 'json'

def crear
  RSpec.describe App do
    describe '1. Crear evento: ' do
      it '1.1 Conexión con backend' do
        url = 'test/conexion'
        test = App.new(url)
        test.get()
        expect(test.response.code).to eq(200)
      end
      it '1.2 Crear evento' do
        data = {
          :nombre => 'Biopolímero a partir del almidón de papa',
          :nombre_url => 'biopolimero-a-partir-del-almidón-de-papa',
          :dia_inicio => '22/07/2015',
          :dia_fin => '22/07/2015',
          :hora_inicio => '14.00',
          :hora_fin => '16:00',
          :lugar => 'Auditorio Edificio S',
          :direccion => 'Avenida Javier Prado Este N.° 4600, Santiago de Surco, Lima, Perú '
        }.to_json
        url = 'evento/crear?evento=' + data
        test = App.new(url)
        test.post()
        if test.response.code != 200 then
          puts test.response.body
        end
        expect(test.response.code).to eq(200)
        expect(test.response.body).not_to include('error')
        expect(test.response.body).to include('Se ha registrado el evento')
        expect(test.response.body).to include('success')
      end
    end
  end
end

crear
