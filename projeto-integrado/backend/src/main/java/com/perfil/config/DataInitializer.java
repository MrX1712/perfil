package com.perfil.config;

import com.perfil.model.Perfil;
import com.perfil.repository.PerfilRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private PerfilRepository perfilRepository;

    @Override
    public void run(String... args) throws Exception {
        // Verificar se já existem perfis
        if (perfilRepository.count() == 0) {
            System.out.println("Criando perfis iniciais...");

            perfilRepository.save(new Perfil("Minimal", 1));
            perfilRepository.save(new Perfil("Sofisticado I", 2));
            perfilRepository.save(new Perfil("Sofisticado II", 3));
            perfilRepository.save(new Perfil("Sofisticado III", 4));
            perfilRepository.save(new Perfil("Investidor Antifrágil", 5));

            System.out.println("Perfis criados com sucesso!");
        } else {
            System.out.println("Perfis já existem no banco.");
        }
    }
}