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
          :dni => '70232385',
          :nombres => 'Carlos Alberto',
          :paterno => 'Tevez x',
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

def editar
  RSpec.describe App do
    describe '2. Editar externo: ' do
      it '2.1 Conexión con backend' do
        url = 'test/conexion'
        test = App.new(url)
        test.get()
        expect(test.response.code).to eq(200)
      end
      it '2.2 Editar externo' do
        data = {
          :_id => '5aad83a589095b5a00000000',
          :dni => '70232385',
          :nombres => 'Carlosx Albertox',
          :paterno => 'Tevez x',
          :materno => 'Martinez x',
          :correo => 'carlitos@cabj.agr',
          :telefono => '819234-12312123',
        }.to_json
        url = 'externo/editar?evento=' + data
        test = App.new(url)
        test.post()
        if test.response.code != 200 then
          puts test.response.body
        end
        expect(test.response.code).to eq(200)
        expect(test.response.body).not_to include('error')
        expect(test.response.body).to include('Se ha editado el participante externo')
        expect(test.response.body).to include('success')
      end
    end
  end
end

def eliminar
  RSpec.describe App do
    describe '3. Eliminar participantes externos: ' do
      it '3.1 Conexión con backend' do
        url = 'test/conexion'
        test = App.new(url)
        test.get()
        expect(test.response.code).to eq(200)
      end
      it '3.2 Eliminar participantes externos' do
        data = {
          :nuevos => [
          ],
          :editados => [
          ],
          :eliminados => ['5aad82bcf1f2f57200000001']
        }.to_json
        url = 'externo/guardar?data=' + data
        test = App.new(url)
        test.post()
        if test.response.code != 200 then
          puts test.response.body
        end
        expect(test.response.code).to eq(200)
        expect(test.response.body).not_to include('error')
        expect(test.response.body).to include('Se ha registrado los cambios en los participantes externos')
        expect(test.response.body).to include('success')
      end
    end
  end
end

eliminar
